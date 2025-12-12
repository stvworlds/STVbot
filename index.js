require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const loadCommands = require('./utils/loadCommands');
const loadEvents = require('./utils/loadEvents');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
  partials: [Partials.Channel],
});

loadCommands(client);
loadEvents(client);

client.login(process.env.BOT_TOKEN);
