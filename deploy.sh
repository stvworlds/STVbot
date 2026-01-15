#!/bin/bash
# deploy.sh
cd ~/STVdsbot.js || exit 1

# Оновлюємо код з main
git pull

# Встановлюємо залежності та білд
npm install
# Запускаємо додатокp
node run ./index.js
