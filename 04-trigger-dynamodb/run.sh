#!/bin/bash

#1. Invoke
sls invoke -f hero-insert --log

#2. Invoke with body params
sls invoke local -f hero-insert --path requests-mock/hero.insert.json