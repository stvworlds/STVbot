#!/bin/bash
# deploy.sh
cd ~/STVbot || exit 1

git pull


npm install

node index.js
