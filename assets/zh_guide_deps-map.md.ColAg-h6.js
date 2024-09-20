import{_ as t,c as d,o as b,a1 as r}from"./chunks/framework.CszIUXhs.js";const z=JSON.parse('{"title":"依赖关系图表","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"zh/guide/deps-map.md","filePath":"zh/guide/deps-map.md"}'),l={name:"zh/guide/deps-map.md"},i=r('<h1 id="依赖关系图表" tabindex="-1">依赖关系图表 <a class="header-anchor" href="#依赖关系图表" aria-label="Permalink to &quot;依赖关系图表&quot;">​</a></h1><p>在编译 PHP 时，每个扩展、库都有依赖关系，这些依赖关系可能是必需的，也可能是可选的。在编译 PHP 时，可以选择是否包含这些可选的依赖关系。</p><p>例如，在 Linux 下编译 <code>gd</code> 扩展时，会强制编译 <code>zlib,libpng</code> 库和 <code>zlib</code> 扩展，而 <code>libavif,libwebp,libjpeg,freetype</code> 库都是可选的库，默认不会编译，除非通过 <code>--with-libs=avif,webp,jpeg,freetype</code> 选项指定。</p><ul><li>对于可选扩展（扩展的可选特性），需手动在编译时指定，例如启用 Redis 的 igbinary 支持：<code>bin/spc build redis,igbinary</code>。</li><li>对于可选库，需通过 <code>--with-libs=XXX</code> 选项编译指定。</li><li>如果想启用所有的可选扩展，可以使用 <code>bin/spc build redis --with-suggested-exts</code> 参数。</li><li>如果想启用所有的可选库，可以使用 <code>--with-suggested-libs</code> 参数。</li></ul><h2 id="扩展的依赖图" tabindex="-1">扩展的依赖图 <a class="header-anchor" href="#扩展的依赖图" aria-label="Permalink to &quot;扩展的依赖图&quot;">​</a></h2><h3 id="linux" tabindex="-1">Linux <a class="header-anchor" href="#linux" aria-label="Permalink to &quot;Linux&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Extension Name</th><th>Required Extensions</th><th>Suggested Extensions</th><th>Required Libraries</th><th>Suggested Libraries</th></tr></thead><tbody><tr><td><b>amqp</b></td><td></td><td></td><td>librabbitmq</td><td></td></tr><tr><td><b>bz2</b></td><td></td><td></td><td>bzip2</td><td></td></tr><tr><td><b>curl</b></td><td></td><td></td><td>curl</td><td></td></tr><tr><td><b>dba</b></td><td></td><td></td><td></td><td>qdbm</td></tr><tr><td><b>dom</b></td><td></td><td></td><td>libxml2<br>zlib</td><td></td></tr><tr><td><b>event</b></td><td>openssl</td><td>sockets</td><td>libevent</td><td></td></tr><tr><td><b>ftp</b></td><td></td><td></td><td></td><td>openssl</td></tr><tr><td><b>gd</b></td><td>zlib</td><td></td><td>zlib<br>libpng</td><td>libavif<br>libwebp<br>libjpeg<br>freetype</td></tr><tr><td><b>gettext</b></td><td></td><td></td><td>gettext</td><td></td></tr><tr><td><b>gmp</b></td><td></td><td></td><td>gmp</td><td></td></tr><tr><td><b>gmssl</b></td><td></td><td></td><td>gmssl</td><td></td></tr><tr><td><b>iconv</b></td><td></td><td></td><td>libiconv</td><td></td></tr><tr><td><b>igbinary</b></td><td></td><td>session<br>apcu</td><td></td><td></td></tr><tr><td><b>imagick</b></td><td></td><td></td><td>imagemagick</td><td></td></tr><tr><td><b>imap</b></td><td></td><td>openssl</td><td>imap</td><td></td></tr><tr><td><b>intl</b></td><td></td><td></td><td>icu</td><td></td></tr><tr><td><b>ldap</b></td><td></td><td>openssl</td><td>ldap</td><td>gmp<br>libsodium</td></tr><tr><td><b>libxml</b></td><td>xml</td><td></td><td></td><td></td></tr><tr><td><b>mbregex</b></td><td>mbstring</td><td></td><td>onig</td><td></td></tr><tr><td><b>memcache</b></td><td>session</td><td></td><td>zlib</td><td></td></tr><tr><td><b>mongodb</b></td><td></td><td></td><td></td><td>icu<br>openssl<br>zstd<br>zlib</td></tr><tr><td><b>mysqli</b></td><td>mysqlnd</td><td></td><td></td><td></td></tr><tr><td><b>mysqlnd</b></td><td></td><td></td><td>zlib</td><td></td></tr><tr><td><b>openssl</b></td><td>zlib</td><td></td><td>openssl<br>zlib</td><td></td></tr><tr><td><b>password-argon2</b></td><td></td><td></td><td>libargon2</td><td></td></tr><tr><td><b>pdo_mysql</b></td><td>pdo<br>mysqlnd</td><td></td><td></td><td></td></tr><tr><td><b>pdo_pgsql</b></td><td>pdo<br>pgsql</td><td></td><td>postgresql</td><td></td></tr><tr><td><b>pdo_sqlite</b></td><td>pdo<br>sqlite3</td><td></td><td>sqlite</td><td></td></tr><tr><td><b>pdo_sqlsrv</b></td><td>pdo<br>sqlsrv</td><td></td><td></td><td></td></tr><tr><td><b>pgsql</b></td><td></td><td></td><td>postgresql</td><td></td></tr><tr><td><b>phar</b></td><td>zlib</td><td></td><td></td><td></td></tr><tr><td><b>readline</b></td><td></td><td></td><td>readline</td><td></td></tr><tr><td><b>redis</b></td><td></td><td>session<br>igbinary</td><td></td><td>zstd<br>liblz4</td></tr><tr><td><b>simplexml</b></td><td></td><td></td><td>libxml2</td><td></td></tr><tr><td><b>snappy</b></td><td></td><td>apcu</td><td>snappy</td><td></td></tr><tr><td><b>soap</b></td><td></td><td></td><td>libxml2</td><td></td></tr><tr><td><b>sodium</b></td><td></td><td></td><td>libsodium</td><td></td></tr><tr><td><b>spx</b></td><td></td><td></td><td>zlib</td><td></td></tr><tr><td><b>sqlite3</b></td><td></td><td></td><td>sqlite</td><td></td></tr><tr><td><b>sqlsrv</b></td><td>pcntl</td><td></td><td>unixodbc</td><td></td></tr><tr><td><b>ssh2</b></td><td></td><td></td><td>libssh2</td><td></td></tr><tr><td><b>swoole</b></td><td>openssl<br>curl</td><td>swoole-hook-pgsql<br>swoole-hook-mysql<br>swoole-hook-sqlite</td><td>libcares<br>brotli<br>nghttp2<br>zlib</td><td></td></tr><tr><td><b>swoole-hook-mysql</b></td><td>mysqlnd<br>pdo<br>pdo_mysql</td><td>mysqli</td><td></td><td></td></tr><tr><td><b>swoole-hook-pgsql</b></td><td>pgsql<br>pdo</td><td></td><td></td><td></td></tr><tr><td><b>swoole-hook-sqlite</b></td><td>sqlite3<br>pdo</td><td></td><td></td><td></td></tr><tr><td><b>swow</b></td><td></td><td>openssl<br>curl</td><td></td><td>openssl<br>curl</td></tr><tr><td><b>tidy</b></td><td></td><td></td><td>tidy</td><td></td></tr><tr><td><b>uuid</b></td><td></td><td></td><td>libuuid</td><td></td></tr><tr><td><b>uv</b></td><td>sockets</td><td></td><td>libuv</td><td></td></tr><tr><td><b>xhprof</b></td><td>ctype</td><td></td><td></td><td></td></tr><tr><td><b>xlswriter</b></td><td>zlib<br>zip</td><td></td><td></td><td>openssl</td></tr><tr><td><b>xml</b></td><td></td><td></td><td>libxml2</td><td></td></tr><tr><td><b>xmlreader</b></td><td></td><td></td><td>libxml2</td><td></td></tr><tr><td><b>xmlwriter</b></td><td></td><td></td><td>libxml2</td><td></td></tr><tr><td><b>xsl</b></td><td>xml<br>dom</td><td></td><td>libxslt</td><td></td></tr><tr><td><b>yac</b></td><td>igbinary</td><td></td><td></td><td></td></tr><tr><td><b>yaml</b></td><td></td><td></td><td>libyaml</td><td></td></tr><tr><td><b>zip</b></td><td></td><td></td><td>libzip</td><td></td></tr><tr><td><b>zlib</b></td><td></td><td></td><td>zlib</td><td></td></tr><tr><td><b>zstd</b></td><td></td><td></td><td>zstd</td><td></td></tr></tbody></table><h3 id="macos" tabindex="-1">macOS <a class="header-anchor" href="#macos" aria-label="Permalink to &quot;macOS&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Extension Name</th><th>Required Extensions</th><th>Suggested Extensions</th><th>Required Libraries</th><th>Suggested Libraries</th></tr></thead><tbody><tr><td><b>amqp</b></td><td></td><td></td><td>librabbitmq</td><td></td></tr><tr><td><b>bz2</b></td><td></td><td></td><td>bzip2</td><td></td></tr><tr><td><b>curl</b></td><td></td><td></td><td>curl</td><td></td></tr><tr><td><b>dba</b></td><td></td><td></td><td></td><td>qdbm</td></tr><tr><td><b>dom</b></td><td></td><td></td><td>libxml2<br>zlib</td><td></td></tr><tr><td><b>event</b></td><td>openssl</td><td>sockets</td><td>libevent</td><td></td></tr><tr><td><b>ffi</b></td><td></td><td></td><td>libffi</td><td></td></tr><tr><td><b>ftp</b></td><td></td><td></td><td></td><td>openssl</td></tr><tr><td><b>gd</b></td><td>zlib</td><td></td><td>zlib<br>libpng</td><td>libavif<br>libwebp<br>libjpeg<br>freetype</td></tr><tr><td><b>gettext</b></td><td></td><td></td><td>gettext</td><td></td></tr><tr><td><b>glfw</b></td><td></td><td></td><td>glfw</td><td></td></tr><tr><td><b>gmp</b></td><td></td><td></td><td>gmp</td><td></td></tr><tr><td><b>gmssl</b></td><td></td><td></td><td>gmssl</td><td></td></tr><tr><td><b>iconv</b></td><td></td><td></td><td>libiconv</td><td></td></tr><tr><td><b>igbinary</b></td><td></td><td>session<br>apcu</td><td></td><td></td></tr><tr><td><b>imagick</b></td><td></td><td></td><td>imagemagick</td><td></td></tr><tr><td><b>imap</b></td><td></td><td>openssl</td><td>imap</td><td></td></tr><tr><td><b>intl</b></td><td></td><td></td><td>icu</td><td></td></tr><tr><td><b>ldap</b></td><td></td><td>openssl</td><td>ldap</td><td>gmp<br>libsodium</td></tr><tr><td><b>libxml</b></td><td>xml</td><td></td><td></td><td></td></tr><tr><td><b>mbregex</b></td><td>mbstring</td><td></td><td>onig</td><td></td></tr><tr><td><b>memcache</b></td><td>session</td><td></td><td>zlib</td><td></td></tr><tr><td><b>memcached</b></td><td>session<br>zlib</td><td></td><td>libmemcached</td><td></td></tr><tr><td><b>mongodb</b></td><td></td><td></td><td></td><td>icu<br>openssl<br>zstd<br>zlib</td></tr><tr><td><b>mysqli</b></td><td>mysqlnd</td><td></td><td></td><td></td></tr><tr><td><b>mysqlnd</b></td><td></td><td></td><td>zlib</td><td></td></tr><tr><td><b>openssl</b></td><td>zlib</td><td></td><td>openssl<br>zlib</td><td></td></tr><tr><td><b>password-argon2</b></td><td></td><td></td><td>libargon2</td><td></td></tr><tr><td><b>pdo_mysql</b></td><td>pdo<br>mysqlnd</td><td></td><td></td><td></td></tr><tr><td><b>pdo_pgsql</b></td><td>pdo<br>pgsql</td><td></td><td>postgresql</td><td></td></tr><tr><td><b>pdo_sqlite</b></td><td>pdo<br>sqlite3</td><td></td><td>sqlite</td><td></td></tr><tr><td><b>pdo_sqlsrv</b></td><td>pdo<br>sqlsrv</td><td></td><td></td><td></td></tr><tr><td><b>pgsql</b></td><td></td><td></td><td>postgresql</td><td></td></tr><tr><td><b>phar</b></td><td>zlib</td><td></td><td></td><td></td></tr><tr><td><b>readline</b></td><td></td><td></td><td>readline</td><td></td></tr><tr><td><b>redis</b></td><td></td><td>session<br>igbinary</td><td></td><td>zstd<br>liblz4</td></tr><tr><td><b>simplexml</b></td><td></td><td></td><td>libxml2</td><td></td></tr><tr><td><b>snappy</b></td><td></td><td>apcu</td><td>snappy</td><td></td></tr><tr><td><b>soap</b></td><td></td><td></td><td>libxml2</td><td></td></tr><tr><td><b>sodium</b></td><td></td><td></td><td>libsodium</td><td></td></tr><tr><td><b>spx</b></td><td></td><td></td><td>zlib</td><td></td></tr><tr><td><b>sqlite3</b></td><td></td><td></td><td>sqlite</td><td></td></tr><tr><td><b>sqlsrv</b></td><td></td><td></td><td>unixodbc</td><td></td></tr><tr><td><b>ssh2</b></td><td></td><td></td><td>libssh2</td><td></td></tr><tr><td><b>swoole</b></td><td>openssl<br>curl</td><td>swoole-hook-pgsql<br>swoole-hook-mysql<br>swoole-hook-sqlite</td><td>libcares<br>brotli<br>nghttp2<br>zlib</td><td></td></tr><tr><td><b>swoole-hook-mysql</b></td><td>mysqlnd<br>pdo<br>pdo_mysql</td><td>mysqli</td><td></td><td></td></tr><tr><td><b>swoole-hook-pgsql</b></td><td>pgsql<br>pdo</td><td></td><td></td><td></td></tr><tr><td><b>swoole-hook-sqlite</b></td><td>sqlite3<br>pdo</td><td></td><td></td><td></td></tr><tr><td><b>swow</b></td><td></td><td>openssl<br>curl</td><td></td><td>openssl<br>curl</td></tr><tr><td><b>tidy</b></td><td></td><td></td><td>tidy</td><td></td></tr><tr><td><b>uuid</b></td><td></td><td></td><td>libuuid</td><td></td></tr><tr><td><b>uv</b></td><td>sockets</td><td></td><td>libuv</td><td></td></tr><tr><td><b>xhprof</b></td><td>ctype</td><td></td><td></td><td></td></tr><tr><td><b>xlswriter</b></td><td>zlib<br>zip</td><td></td><td></td><td>openssl</td></tr><tr><td><b>xml</b></td><td></td><td></td><td>libxml2</td><td></td></tr><tr><td><b>xmlreader</b></td><td></td><td></td><td>libxml2</td><td></td></tr><tr><td><b>xmlwriter</b></td><td></td><td></td><td>libxml2</td><td></td></tr><tr><td><b>xsl</b></td><td>xml<br>dom</td><td></td><td>libxslt</td><td></td></tr><tr><td><b>yac</b></td><td>igbinary</td><td></td><td></td><td></td></tr><tr><td><b>yaml</b></td><td></td><td></td><td>libyaml</td><td></td></tr><tr><td><b>zip</b></td><td></td><td></td><td>libzip</td><td></td></tr><tr><td><b>zlib</b></td><td></td><td></td><td>zlib</td><td></td></tr><tr><td><b>zstd</b></td><td></td><td></td><td>zstd</td><td></td></tr></tbody></table><h3 id="windows" tabindex="-1">Windows <a class="header-anchor" href="#windows" aria-label="Permalink to &quot;Windows&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Extension Name</th><th>Required Extensions</th><th>Suggested Extensions</th><th>Required Libraries</th><th>Suggested Libraries</th></tr></thead><tbody><tr><td><b>amqp</b></td><td>openssl</td><td></td><td>librabbitmq</td><td></td></tr><tr><td><b>bz2</b></td><td></td><td></td><td>bzip2</td><td></td></tr><tr><td><b>curl</b></td><td>zlib<br>openssl</td><td></td><td>curl</td><td></td></tr><tr><td><b>dba</b></td><td></td><td></td><td></td><td>qdbm</td></tr><tr><td><b>dom</b></td><td>xml</td><td></td><td>libxml2<br>zlib</td><td></td></tr><tr><td><b>ffi</b></td><td></td><td></td><td>libffi-win</td><td></td></tr><tr><td><b>ftp</b></td><td></td><td></td><td></td><td>openssl</td></tr><tr><td><b>gd</b></td><td>zlib</td><td></td><td>zlib<br>libpng</td><td>libavif<br>libwebp<br>libjpeg<br>freetype</td></tr><tr><td><b>gmssl</b></td><td></td><td></td><td>gmssl</td><td></td></tr><tr><td><b>iconv</b></td><td></td><td></td><td>libiconv-win</td><td></td></tr><tr><td><b>igbinary</b></td><td></td><td>session<br>apcu</td><td></td><td></td></tr><tr><td><b>libxml</b></td><td>xml</td><td></td><td></td><td></td></tr><tr><td><b>mbregex</b></td><td>mbstring</td><td></td><td>onig</td><td></td></tr><tr><td><b>mysqli</b></td><td>mysqlnd</td><td></td><td></td><td></td></tr><tr><td><b>mysqlnd</b></td><td></td><td></td><td>zlib</td><td></td></tr><tr><td><b>openssl</b></td><td>zlib</td><td></td><td>openssl<br>zlib</td><td></td></tr><tr><td><b>parallel</b></td><td></td><td></td><td>pthreads4w</td><td></td></tr><tr><td><b>pdo_mysql</b></td><td>pdo<br>mysqlnd</td><td></td><td></td><td></td></tr><tr><td><b>pdo_sqlite</b></td><td>pdo<br>sqlite3</td><td></td><td>sqlite</td><td></td></tr><tr><td><b>pdo_sqlsrv</b></td><td>pdo<br>sqlsrv</td><td></td><td></td><td></td></tr><tr><td><b>phar</b></td><td>zlib</td><td></td><td></td><td></td></tr><tr><td><b>redis</b></td><td></td><td>session<br>igbinary</td><td></td><td></td></tr><tr><td><b>simplexml</b></td><td>xml</td><td></td><td>libxml2</td><td></td></tr><tr><td><b>soap</b></td><td>xml</td><td></td><td>libxml2</td><td></td></tr><tr><td><b>sqlite3</b></td><td></td><td></td><td>sqlite</td><td></td></tr><tr><td><b>ssh2</b></td><td>openssl<br>zlib</td><td></td><td>libssh2</td><td></td></tr><tr><td><b>swow</b></td><td></td><td>openssl<br>curl</td><td></td><td>openssl<br>curl</td></tr><tr><td><b>xml</b></td><td>iconv</td><td></td><td>libxml2</td><td></td></tr><tr><td><b>xmlreader</b></td><td>xml<br>dom</td><td></td><td>libxml2</td><td></td></tr><tr><td><b>xmlwriter</b></td><td>xml</td><td></td><td>libxml2</td><td></td></tr><tr><td><b>yaml</b></td><td></td><td></td><td>libyaml</td><td></td></tr><tr><td><b>zip</b></td><td>zlib<br>bz2</td><td></td><td>libzip<br>zlib<br>bzip2<br>xz</td><td></td></tr><tr><td><b>zlib</b></td><td></td><td></td><td>zlib</td><td></td></tr></tbody></table><h3 id="freebsd" tabindex="-1">FreeBSD <a class="header-anchor" href="#freebsd" aria-label="Permalink to &quot;FreeBSD&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Extension Name</th><th>Required Extensions</th><th>Suggested Extensions</th><th>Required Libraries</th><th>Suggested Libraries</th></tr></thead><tbody><tr><td><b>bz2</b></td><td></td><td></td><td>bzip2</td><td></td></tr><tr><td><b>curl</b></td><td></td><td></td><td>curl</td><td></td></tr><tr><td><b>dba</b></td><td></td><td></td><td></td><td>qdbm</td></tr><tr><td><b>ftp</b></td><td></td><td></td><td></td><td>openssl</td></tr><tr><td><b>mbregex</b></td><td>mbstring</td><td></td><td>onig</td><td></td></tr><tr><td><b>mysqli</b></td><td>mysqlnd</td><td></td><td></td><td></td></tr><tr><td><b>mysqlnd</b></td><td></td><td></td><td>zlib</td><td></td></tr><tr><td><b>openssl</b></td><td>zlib</td><td></td><td>openssl<br>zlib</td><td></td></tr><tr><td><b>pdo_mysql</b></td><td>pdo<br>mysqlnd</td><td></td><td></td><td></td></tr><tr><td><b>phar</b></td><td>zlib</td><td></td><td></td><td></td></tr><tr><td><b>zlib</b></td><td></td><td></td><td>zlib</td><td></td></tr></tbody></table><h2 id="库的依赖表" tabindex="-1">库的依赖表 <a class="header-anchor" href="#库的依赖表" aria-label="Permalink to &quot;库的依赖表&quot;">​</a></h2><h3 id="linux-1" tabindex="-1">Linux <a class="header-anchor" href="#linux-1" aria-label="Permalink to &quot;Linux&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Library Name</th><th>Required Libraries</th><th>Suggested Libraries</th></tr></thead><tbody><tr><td><b>curl</b></td><td>openssl<br>zlib</td><td>libssh2<br>brotli<br>nghttp2<br>zstd<br>libcares</td></tr><tr><td><b>freetype</b></td><td>zlib</td><td>libpng<br>bzip2<br>brotli</td></tr><tr><td><b>gettext</b></td><td>libiconv</td><td>ncurses<br>libxml2</td></tr><tr><td><b>imagemagick</b></td><td>zlib<br>libpng<br>libjpeg<br>libwebp<br>freetype<br>libtiff</td><td>zstd<br>xz<br>bzip2<br>libzip<br>libxml2</td></tr><tr><td><b>imap</b></td><td></td><td>openssl</td></tr><tr><td><b>ldap</b></td><td>openssl<br>zlib<br>gmp<br>libsodium</td><td></td></tr><tr><td><b>libevent</b></td><td>openssl</td><td></td></tr><tr><td><b>libpng</b></td><td>zlib</td><td></td></tr><tr><td><b>librabbitmq</b></td><td>openssl</td><td></td></tr><tr><td><b>libssh2</b></td><td>openssl</td><td>zlib</td></tr><tr><td><b>libxml2</b></td><td>libiconv</td><td>xz<br>icu<br>zlib</td></tr><tr><td><b>libxslt</b></td><td>libxml2</td><td></td></tr><tr><td><b>libzip</b></td><td>zlib</td><td>bzip2<br>xz<br>zstd<br>openssl</td></tr><tr><td><b>nghttp2</b></td><td>zlib<br>openssl</td><td>libxml2</td></tr><tr><td><b>openssl</b></td><td>zlib</td><td></td></tr><tr><td><b>postgresql</b></td><td>libiconv<br>libxml2<br>openssl<br>zlib<br>readline</td><td>icu<br>libxslt<br>ldap<br>zstd</td></tr><tr><td><b>readline</b></td><td>ncurses</td><td></td></tr><tr><td><b>snappy</b></td><td>zlib</td><td></td></tr><tr><td><b>unixodbc</b></td><td>libiconv</td><td></td></tr><tr><td><b>xz</b></td><td>libiconv</td><td></td></tr></tbody></table><h3 id="macos-1" tabindex="-1">macOS <a class="header-anchor" href="#macos-1" aria-label="Permalink to &quot;macOS&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Library Name</th><th>Required Libraries</th><th>Suggested Libraries</th></tr></thead><tbody><tr><td><b>curl</b></td><td>openssl<br>zlib</td><td>libssh2<br>brotli<br>nghttp2<br>zstd<br>libcares</td></tr><tr><td><b>freetype</b></td><td>zlib</td><td>libpng<br>bzip2<br>brotli</td></tr><tr><td><b>gettext</b></td><td>libiconv</td><td>ncurses<br>libxml2</td></tr><tr><td><b>imagemagick</b></td><td>zlib<br>libpng<br>libjpeg<br>libwebp<br>freetype<br>libtiff</td><td>zstd<br>xz<br>bzip2<br>libzip<br>libxml2</td></tr><tr><td><b>imap</b></td><td></td><td>openssl</td></tr><tr><td><b>ldap</b></td><td>openssl<br>zlib<br>gmp<br>libsodium</td><td></td></tr><tr><td><b>libevent</b></td><td>openssl</td><td></td></tr><tr><td><b>libpng</b></td><td>zlib</td><td></td></tr><tr><td><b>librabbitmq</b></td><td>openssl</td><td></td></tr><tr><td><b>libssh2</b></td><td>openssl</td><td>zlib</td></tr><tr><td><b>libxml2</b></td><td>libiconv</td><td>xz<br>icu<br>zlib</td></tr><tr><td><b>libxslt</b></td><td>libxml2</td><td></td></tr><tr><td><b>libzip</b></td><td>zlib</td><td>bzip2<br>xz<br>zstd<br>openssl</td></tr><tr><td><b>nghttp2</b></td><td>zlib<br>openssl</td><td>libxml2</td></tr><tr><td><b>openssl</b></td><td>zlib</td><td></td></tr><tr><td><b>postgresql</b></td><td>libiconv<br>libxml2<br>openssl<br>zlib<br>readline</td><td>icu<br>libxslt<br>ldap<br>zstd</td></tr><tr><td><b>readline</b></td><td>ncurses</td><td></td></tr><tr><td><b>snappy</b></td><td>zlib</td><td></td></tr><tr><td><b>unixodbc</b></td><td>libiconv</td><td></td></tr><tr><td><b>xz</b></td><td>libiconv</td><td></td></tr></tbody></table><h3 id="windows-1" tabindex="-1">Windows <a class="header-anchor" href="#windows-1" aria-label="Permalink to &quot;Windows&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Library Name</th><th>Required Libraries</th><th>Suggested Libraries</th></tr></thead><tbody><tr><td><b>curl</b></td><td>openssl<br>zlib<br>libssh2<br>nghttp2</td><td>brotli<br>zstd</td></tr><tr><td><b>freetype</b></td><td>zlib</td><td>libpng<br>bzip2<br>brotli</td></tr><tr><td><b>libjpeg</b></td><td></td><td>zlib</td></tr><tr><td><b>libpng</b></td><td>zlib</td><td></td></tr><tr><td><b>librabbitmq</b></td><td>openssl</td><td></td></tr><tr><td><b>libssh2</b></td><td>openssl</td><td>zlib</td></tr><tr><td><b>libxml2</b></td><td>libiconv-win</td><td>zlib</td></tr><tr><td><b>libzip</b></td><td>zlib<br>bzip2<br>xz</td><td>zstd<br>openssl</td></tr><tr><td><b>nghttp2</b></td><td>zlib<br>openssl</td><td>libxml2</td></tr><tr><td><b>openssl</b></td><td>zlib</td><td></td></tr></tbody></table><h3 id="freebsd-1" tabindex="-1">FreeBSD <a class="header-anchor" href="#freebsd-1" aria-label="Permalink to &quot;FreeBSD&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Library Name</th><th>Required Libraries</th><th>Suggested Libraries</th></tr></thead><tbody><tr><td><b>curl</b></td><td>openssl<br>zlib</td><td>libssh2<br>brotli<br>nghttp2<br>zstd<br>libcares</td></tr><tr><td><b>openssl</b></td><td>zlib</td><td></td></tr></tbody></table>',22),e=[i];function s(o,a,n,p,m,h){return b(),d("div",null,e)}const g=t(l,[["render",s]]);export{z as __pageData,g as default};
