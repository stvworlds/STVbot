const { SlashCommandBuilder, InteractionContextType } = require('discord.js');
const dogEmbed = require('../../embeds/fun/dog');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Випадкові картинки собачок.')
        .setContexts([InteractionContextType.PrivateChannel, InteractionContextType.Guild, InteractionContextType.BotDM]),

    async execute(interaction) {
        await interaction.reply({ embeds: [await dogEmbed.getEmbed(interaction)]})
    },
};