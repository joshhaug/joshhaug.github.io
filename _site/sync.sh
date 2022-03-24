#!/bin/bash
DATE=$(date +"%Y-%m-%d_%H-%M")
# in case of any remote changes, pull first
git pull
# add all changed files
git add *
# commit and push
git commit -m "Auto commit with new data: $DATE"
git push
