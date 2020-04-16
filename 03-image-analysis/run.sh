#!/bin/bash

#1. Invoke com logs
 sls invoke -f img-analysis --log

#2. Invoke local
sls invoke local -f img-analysis

