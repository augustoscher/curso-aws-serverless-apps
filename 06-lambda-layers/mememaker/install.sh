#!/bin/bash

rm -rf dependencies
mkdir -p dependencies

# install GraphicsMagick with yum on docker container
docker run --rm \
  -v "$PWD"/dependencies:/lambda/opt \
  lambci/yumda:2 yum install -y git GraphicsMagick

# Change ownership of folders
sudo chown -R dependencies

# zip dependencies folder
cd dependencies
zip -yr ../dependencies.zip .
