const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js')

module.exports = function loadCommands(client) {
  client.commands = new Collection();
  const commandsPath = path.join(__dirname, '..', 'commands');

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.js')) {
        const command = require(fullPath);
        if (command?.data?.name) {
          client.commands.set(command.data.name, command);
        }
      }
    }
  }

  walk(commandsPath);
};
