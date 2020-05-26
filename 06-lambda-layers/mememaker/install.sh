#!/bin/bash

rm -rf dependencies
mkdir -p dependencies

docker run --rm \
    -v "$PWD"/dependencies:/lambda/opt \
    lambci/yumda:2 yum install -y GraphicsMagick

cd dependencies
zip -yr ../dependencies.zip .
cd ..
