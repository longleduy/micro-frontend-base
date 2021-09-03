#!/bin/bash
#eval $(egrep -v '^#' .env | xargs) MYCOMMAND

ENV=dev
BRANCH=develop
PACKAGE=container
STATIC_PATH=a

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
echo "---PROCESS: GIT PULLING---"
git fetch --all && git checkout $BRANCH && git reset --hard origin/$BRANCH
if [ $? -eq 0 ]; then
    echo OK
else
    echo FAIL
fi

echo "---PROCESS: BUILD PACKAGE $PACKAGE DELETING...---"
rm -rf "build/$PACKAGE"

#echo "---PROCESS: BUILD PACKAGE $PACKAGE BUILDING...---"
#yarn workspace $PACKAGE build
#
#echo "---PROCESS: BUILD PACKAGE $PACKAGE MOVING TO $STATIC_PATH...---"
#cp -r "build/$PACKAGE" $STATIC_PATH

## deploy
#if [ $? -eq 0 ]; then
#  docker tag "$DOCKER_IMG:latest" "$AWS_FAMILY/$DOCKER_IMG:latest"
#  docker push "$AWS_FAMILY/$DOCKER_IMG:latest"
#  aws ecs update-service --cluster $CLUSTER_NAME --service $SERVICE_NAME --force-new-deployment --query 'service.deployments[0]'
#else
#  echo "ERR::Build failed!"
#fi
