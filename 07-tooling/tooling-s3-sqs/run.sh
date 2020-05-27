#!/bin/bash

# Setup lambda locally
sls offline

# Calling hello word in another terminal
curl http://localhost:3000/dev/hello

# Creating test
sls create test -f hello