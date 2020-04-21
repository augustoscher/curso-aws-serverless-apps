#!/bin/bash

#1. Invoke local docker to generate docker image
sls invoke local --docker -f hello

#2. Invoke
sls invoke -f hello --logger