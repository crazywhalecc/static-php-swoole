<?php

declare(strict_types=1);

namespace SPC\builder\macos\library;

class gettext extends MacOSLibraryBase
{
    use \SPC\builder\unix\library\gettext;

    public const NAME = 'gettext';
}
