#!/bin/bash
# deploy.sh
cd ~/STVdsbot.js || exit 1

# Оновлюємо код з main
git pull

# Встановлюємо залежності та білд
bun install
bun run build

# Запускаємо додаток
bun run start
