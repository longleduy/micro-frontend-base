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
echo "STEP 0: CREATE PROD .ENV"
set +e
cp "packages/$PACKAGE/.env.$ENV" "packages/$PACKAGE/.env"
set -e
echo "STEP 0: DONE"

echo "STEP 1: GIT PULL BRANCH: $BRANCH"
git restore --staged . && git stash && git clean -fd
git fetch origin $BRANCH && git checkout $BRANCH && git reset --hard origin/$BRANCH
if [ $? -eq 0 ]; then
    echo "STEP 1: DONE"
else
    echo "STEP 1: ERROR"
    exit 1
fi
echo "\n\n"

echo "STEP 2: REMOVE OLD BUILD FOLDER OF: $PACKAGE"
rm -rf "build/$PACKAGE"
if [ $? -eq 0 ]; then
    echo "STEP 2: DONE"
else
    echo "STEP 2: ERROR"
    exit 1
fi
echo "\n\n"

echo "STEP 3: YARN INSTALL PACKAGE"
yarn install
if [ $? -eq 0 ]; then
    echo "STEP 3: DONE"
else
    echo "STEP 3: ERROR"
    exit 1
fi
echo "\n\n"

echo "STEP 4: BUILD PACKAGE: $PACKAGE"
yarn workspace $PACKAGE build
if [ $? -eq 0 ]; then
    echo "STEP 4: DONE"
else
    echo "STEP 4: ERROR"
    exit 1
fi
echo "\n\n"

#
echo "STEP 5: COPPY BUILD PACKAGE $PACKAGE TO $STATIC_PATH"
rm -rf "$STATIC_PATH/$PACKAGE"
cp -r "build/$PACKAGE" "$STATIC_PATH"
if [ "$PACKAGE" = "container" ]; then
  mv -f "$STATIC_PATH/$PACKAGE/latest/index.html" $STATIC_PATH
fi
if [ $? -eq 0 ]; then
    echo "STEP 5: DONE"
else
    echo "STEP 5: ERROR"
    exit 1
fi

