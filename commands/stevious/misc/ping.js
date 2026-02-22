const { SlashCommandBuilder, InteractionContextType } = require('discord.js');
const pingEmbed = require('../../../embeds/stevious/utils/ping');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping pong.')
        .setContexts([InteractionContextType.PrivateChannel, InteractionContextType.Guild, InteractionContextType.BotDM]),


    async execute(interaction) {
        await interaction.reply({ embeds: [pingEmbed.getEmbed(interaction)]})
    },
};