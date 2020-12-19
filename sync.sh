#!/bin/bash
DATE=$(date +"%Y-%m-%d_%H-%M")
git add *
git commit -m "Auto commit with new data: $DATE"
git push
