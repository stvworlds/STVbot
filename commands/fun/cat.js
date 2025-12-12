const { SlashCommandBuilder, InteractionContextType } = require('discord.js');
const catEmbed = require('../../embeds/fun/cat');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Випадкові картинки котиків.')
        .setContexts([InteractionContextType.PrivateChannel, InteractionContextType.Guild, InteractionContextType.BotDM]),

    async execute(interaction) {
        await interaction.reply({ embeds: [await catEmbed.getEmbed(interaction)] });
    },
};