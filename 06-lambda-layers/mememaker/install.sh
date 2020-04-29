#!/bin/bash

rm -rf dependencies
mkdir -p dependencies

# install GraphicsMagick with yum on docker container
docker run --rm \
    -v "$PWD"/dependencies:/lambda/opt \
    lambci/yumda:2 yum install -y GraphicsMagick


# Change ownership of folders
sudo chown augusto.scher -R dependencies

# zip dependencies folder
cd dependencies
zip -yr ../dependencies.zip .
sudo chown augusto.scher -R dependencies.zip

rm -rf dependencies
cd ..

