#!/bin/bash
# deploy.sh
cd ~/STVdsbot.js || exit 1

git pull


npm install

node run index.js
