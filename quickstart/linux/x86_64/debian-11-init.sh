#!/bin/bash

set -exu
__DIR__=$(
  cd "$(dirname "$0")"
  pwd
)

mirror=''
while [ $# -gt 0 ]; do
  case "$1" in
  --mirror)
    mirror="$2"
    shift
    ;;
  --*)
    echo "Illegal option $1"
    ;;
  esac
  shift $(($# > 0 ? 1 : 0))
done

case "$mirror" in
china)
  test -f /etc/apk/repositories.save || cp /etc/apt/sources.list /etc/apt/sources.list.save
  sed -i "s@deb.debian.org@mirrors.ustc.edu.cn@g" /etc/apt/sources.list
  sed -i "s@security.debian.org@mirrors.ustc.edu.cn@g" /etc/apt/sources.list
  ;;

esac

apt update -y
apt install -y git curl wget ca-certificates
apt install -y xz-utils autoconf automake lld libtool cmake bison re2c gettext coreutils lzip zip unzip
apt install -y pkg-config bzip2 flex
apt install -y musl-tools g++
# apt install -y libclang-13-dev clang
# apt install gcc g++

# apt install build-essential linux-headers-$(uname -r)
