#!/bin/bash

#1. Invoke
sls invoke -f hero-insert --log

#2. Invoke with body params
sls invoke local -f hero-insert --path requests-mock/hero.insert.json

#3. Invoke hero trigger
sls invoke local -f hero-trigger --logger

#4. Logs tail
sls logs -f hero-trigger -t

