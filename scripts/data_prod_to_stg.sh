#!/bin/bash
#eval $(egrep -v '^#' .env | xargs) MYCOMMAND

ENV=dev
BRANCH=develop

while getopts "e:b:" opt
do
   case "$opt" in
      e ) ENV="$OPTARG" ;;
      b ) BRANCH="$OPTARG" ;;
   esac
done

cp .env.$ENV .env
export $(egrep -v '^#' .env | xargs)

# aws
aws configure set aws_access_key_id $AWS_ACCESS_KEY
aws configure set aws_secret_access_key $AWS_SECRET_KEY
aws configure set default.region $AWS_REGION
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin "$AWS_FAMILY"

# git
git stash && git clean -fd
git fetch --all && git checkout $BRANCH && git reset --hard origin/$BRANCH

# build
y | docker system prune 
docker build -t "$DOCKER_IMG" .

# deploy
if [ $? -eq 0 ]; then
  docker tag "$DOCKER_IMG:latest" "$AWS_FAMILY/$DOCKER_IMG:latest"
  docker push "$AWS_FAMILY/$DOCKER_IMG:latest"
  aws ecs update-service --cluster $CLUSTER_NAME --service $SERVICE_NAME --force-new-deployment --query 'service.deployments[0]'
else
  echo "ERR::Build failed!"
fi
