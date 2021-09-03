#!/bin/bash
#eval $(egrep -v '^#' .env | xargs) MYCOMMAND

ENV=dev
BRANCH=develop
PACKAGE=container
STATIC_PATH=a

set -e
while getopts "e:b:p:s:" opt
do
   case "$opt" in
      e ) ENV="$OPTARG" ;;
      b ) BRANCH="$OPTARG" ;;
      p ) PACKAGE="$OPTARG" ;;
      s ) STATIC_PATH="$OPTARG" ;;
   esac
done

#cp .env.$ENV .env
#export $(egrep -v '^#' .env | xargs)
#
echo "___PROCESS: GIT PULLING...___"
git fetch --all && git checkout $BRANCH && git reset --hard origin/$BRANCH
if [ $? -eq 0 ]; then
    echo "___SUCCESS: GIT PULLING___"
else
    echo "___ERROR: GIT PULLING___"
    exit 1
fi
echo "\n\n"

echo "___PROCESS: BUILD PACKAGE $PACKAGE DELETING...___"
rm -rf "build/$PACKAGE"
if [ $? -eq 0 ]; then
    echo "___SUCCESS: BUILD PACKAGE $PACKAGE DELETING___"
else
    echo "___ERROR: BUILD PACKAGE $PACKAGE DELETING___"
    exit 1
fi
echo "\n\n"

echo "___PROCESS: BUILD PACKAGE $PACKAGE BUILDING...___"
yarn workspace $PACKAGE build
if [ $? -eq 0 ]; then
    echo "___SUCCESS: BUILD PACKAGE $PACKAGE BUILDING___"
else
    echo "___ERROR: BUILD PACKAGE $PACKAGE BUILDING___"
    exit 1
fi
echo "\n\n"

#
echo "___PROCESS: BUILD PACKAGE $PACKAGE MOVING TO $STATIC_PATH...___"
cp -r "build/$PACKAGE" $STATIC_PATH
if [ $? -eq 0 ]; then
    echo "___DONE___"
else
    echo "___ERROR: BUILD PACKAGE $PACKAGE MOVING TO $STATIC_PATH___"
    exit 1
fi

