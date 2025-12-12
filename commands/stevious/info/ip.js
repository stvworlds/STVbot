const { SlashCommandBuilder, InteractionContextType } = require('discord.js');
const Embed = require("../../../embeds/stevious/info/modpack");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ip')
    .setDescription('Надсилає IP серверу у чат.')
    .setContexts([InteractionContextType.PrivateChannel, InteractionContextType.Guild, InteractionContextType.BotDM]),

    async execute(interaction) {
        await interaction.reply({ embeds: [Embed.getEmbed(interaction)]})
    },
};