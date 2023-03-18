<?php

declare(strict_types=1);

namespace SPC\builder\macos;

use SPC\builder\BuilderBase;
use SPC\builder\macos\library\MacOSLibraryBase;
use SPC\builder\traits\UnixBuilderTrait;
use SPC\exception\FileSystemException;
use SPC\exception\RuntimeException;
use SPC\util\Patcher;

/**
 * macOS 系统环境下的构建器
 * 源于 Config，但因为感觉叫 Config 不太合适，就换成了 Builder
 */
class MacOSBuilder extends BuilderBase
{
    /** 编译的 Unix 工具集 */
    use UnixBuilderTrait;

    /** @var string[] MacOS 环境下编译依赖的命令 */
    public const REQUIRED_COMMANDS = ['make', 'bison', 'flex', 'pkg-config', 'git', 'autoconf', 'automake', 'tar', 'unzip', 'xz', 'gzip', 'bzip2', 'cmake'];

    /** @var bool 标记是否 patch 了 phar */
    private bool $phar_patched = false;

    /**
     * @throws RuntimeException
     */
    public function __construct(?string $cc = null, ?string $cxx = null, ?string $arch = null)
    {
        // 如果是 Debug 模式，才使用 set -x 显示每条执行的命令
        $this->set_x = defined('DEBUG_MODE') ? 'set -x' : 'true';
        // 初始化一些默认参数
        $this->cc = $cc ?? 'clang';
        $this->cxx = $cxx ?? 'clang++';
        $this->arch = $arch ?? php_uname('m');
        $this->gnu_arch = arch2gnu($this->arch);
        // 根据 CPU 线程数设置编译进程数
        $this->concurrency = SystemUtil::getCpuCount();
        // 设置 cflags
        $this->arch_c_flags = SystemUtil::getArchCFlags($this->arch);
        $this->arch_cxx_flags = SystemUtil::getArchCFlags($this->arch);
        // 设置 cmake
        $this->cmake_toolchain_file = SystemUtil::makeCmakeToolchainFile('Darwin', $this->arch, $this->arch_c_flags);
        // 设置 configure 依赖的环境变量
        $this->configure_env =
            'PKG_CONFIG_PATH="' . BUILD_LIB_PATH . '/pkgconfig/" ' .
            "CC='{$this->cc}' " .
            "CXX='{$this->cxx}' " .
            "CFLAGS='{$this->arch_c_flags} -Wimplicit-function-declaration'";
        // 保存丢失的命令
        $missing = [];
        foreach (self::REQUIRED_COMMANDS as $cmd) {
            if (SystemUtil::findCommand($cmd) === null) {
                $missing[] = $cmd;
            }
        }
        if (!empty($missing)) {
            throw new RuntimeException('missing system commands: ' . implode(', ', $missing));
        }

        // 创立 pkg-config 和放头文件的目录
        f_mkdir(BUILD_LIB_PATH . '/pkgconfig', recursive: true);
        f_mkdir(BUILD_INCLUDE_PATH, recursive: true);
    }

    /**
     * 生成库构建采用的 autoconf 参数列表
     *
     * @param string $name      要构建的 lib 库名，传入仅供输出日志
     * @param array  $lib_specs 依赖的 lib 库的 autoconf 文件
     */
    public function makeAutoconfArgs(string $name, array $lib_specs): string
    {
        $ret = '';
        foreach ($lib_specs as $libName => $arr) {
            $lib = $this->getLib($libName);

            $arr = $arr ?? [];

            $disableArgs = $arr[0] ?? null;
            $prefix = $arr[1] ?? null;
            if ($lib instanceof MacOSLibraryBase) {
                logger()->info("{$name} \033[32;1mwith\033[0;1m {$libName} support");
                $ret .= $lib->makeAutoconfEnv($prefix) . ' ';
            } else {
                logger()->info("{$name} \033[31;1mwithout\033[0;1m {$libName} support");
                $ret .= ($disableArgs ?? "--with-{$libName}=no") . ' ';
            }
        }
        return rtrim($ret);
    }

    /**
     * 返回 macOS 系统依赖的框架列表
     *
     * @param bool $asString 是否以字符串形式返回（默认为 False）
     */
    public function getFrameworks(bool $asString = false): array|string
    {
        $libs = [];

        // reorder libs
        foreach ($this->libs as $lib) {
            foreach ($lib->getDependencies() as $dep) {
                $libs[] = $dep;
            }
            $libs[] = $lib;
        }

        $frameworks = [];
        /** @var MacOSLibraryBase $lib */
        foreach ($libs as $lib) {
            array_push($frameworks, ...$lib->getFrameworks());
        }

        if ($asString) {
            return implode(' ', array_map(fn ($x) => "-framework {$x}", $frameworks));
        }
        return $frameworks;
    }

    /**
     * @throws RuntimeException
     * @throws FileSystemException
     */
    public function buildPHP(int $build_micro_rule = BUILD_MICRO_NONE, bool $with_clean = false, bool $bloat = false): void
    {
        $extra_libs = $this->getFrameworks(true) . ' ' . ($this->getExt('swoole') ? '-lc++ ' : '');
        if (!$bloat) {
            $extra_libs .= implode(' ', $this->getAllStaticLibFiles());
        } else {
            logger()->info('bloat linking');
            $extra_libs .= implode(
                ' ',
                array_map(
                    fn ($x) => "-Wl,-force_load,{$x}",
                    array_filter($this->getAllStaticLibFiles())
                )
            );
        }

        // patch before configure
        Patcher::patchPHPBeforeConfigure($this);

        f_passthru(
            $this->set_x . ' && ' .
            'cd ' . SOURCE_PATH . '/php-src && ' .
            './buildconf --force'
        );

        Patcher::patchPHPConfigure($this);

        if ($this->getLib('libxml2') || $this->getExt('iconv')) {
            $extra_libs .= ' -liconv';
        }

        f_passthru(
            $this->set_x . ' && ' .
            'cd ' . SOURCE_PATH . '/php-src && ' .
            './configure ' .
            '--prefix= ' .
            '--with-valgrind=no ' .     // 不检测内存泄漏
            '--enable-shared=no ' .
            '--enable-static=yes ' .
            "--host={$this->gnu_arch}-apple-darwin " .
            "CFLAGS='{$this->arch_c_flags} -Werror=unknown-warning-option' " .
            '--disable-all ' .
            '--disable-cgi ' .
            '--disable-phpdbg ' .
            '--enable-cli ' .
            '--enable-micro ' .
            ($this->zts ? '--enable-zts' : '') . ' ' .
            $this->makeExtensionArgs() . ' ' .
            $this->configure_env
        );

        if ($with_clean) {
            logger()->info('cleaning up');
            f_passthru(
                $this->set_x . ' && ' .
                'cd ' . SOURCE_PATH . '/php-src && ' .
                'make clean'
            );
        }

        switch ($build_micro_rule) {
            case BUILD_MICRO_NONE:
                logger()->info('building cli');
                $this->buildCli($extra_libs);
                break;
            case BUILD_MICRO_ONLY:
                logger()->info('building micro');
                $this->buildMicro($extra_libs);
                break;
            case BUILD_MICRO_BOTH:
                logger()->info('building cli and micro');
                $this->buildCli($extra_libs);
                $this->buildMicro($extra_libs);
                break;
        }

        if (php_uname('m') === $this->arch) {
            $this->sanityCheck($build_micro_rule);
        }

        if ($this->phar_patched) {
            f_passthru('cd ' . SOURCE_PATH . '/php-src && patch -p1 -R < sapi/micro/patches/phar.patch');
        }
    }

    /**
     * 构建 phpmicro
     *
     * @throws RuntimeException
     */
    public function buildMicro(string $extra_libs): void
    {
        if ($this->getPHPVersionID() < 80000) {
            throw new RuntimeException('phpmicro only support PHP >= 8.0!');
        }
        if ($this->getExt('phar')) {
            $this->phar_patched = true;
            try {
                f_passthru('cd ' . SOURCE_PATH . '/php-src && patch -p1 < sapi/micro/patches/phar.patch');
            } catch (RuntimeException $e) {
                logger()->error('failed to patch phat due to patch exit with code ' . $e->getCode());
                $this->phar_patched = false;
            }
        }

        f_passthru(
            $this->set_x . ' && ' .
            'cd ' . SOURCE_PATH . '/php-src && ' .
            "make -j{$this->concurrency} " .
            'EXTRA_CFLAGS="-g -Os -fno-ident" ' .
            "EXTRA_LIBS=\"{$extra_libs} -lresolv\" " .
            'STRIP="dsymutil -f " ' .
            // TODO: comment things
            'micro'
        );
    }

    /**
     * 构建 cli
     *
     * @throws RuntimeException
     */
    public function buildCli(string $extra_libs): void
    {
        f_passthru(
            $this->set_x . ' && ' .
            'cd ' . SOURCE_PATH . '/php-src && ' .
            "make -j{$this->concurrency} " .
            'EXTRA_CFLAGS="-g -Os -fno-ident" ' . // 生成调试信息、优化编译后的尺寸、禁用标识符（如变量、函数名）缩短
            "EXTRA_LIBS=\"{$extra_libs} -lresolv\" " .
            // TODO: comment things
            'cli &&' .
            'dsymutil -f sapi/cli/php &&' .
            'strip sapi/cli/php'
        );
    }

    public function getPHPVersionID(): int
    {
        $file = file_get_contents(SOURCE_PATH . '/php-src/main/php_version.h');
        preg_match('/PHP_VERSION_ID (\d+)/', $file, $match);
        return intval($match[1]);
    }
}
