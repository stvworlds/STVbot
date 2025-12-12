const { SlashCommandBuilder, InteractionContextType } = require('discord.js');
const mediaEmbed = require('../../../embeds/stevious/utils/links');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('media')
        .setDescription('Надсилає медіа серверу у чат.')
        .setContexts([InteractionContextType.PrivateChannel, InteractionContextType.Guild, InteractionContextType.BotDM]),

    async autocomplete(interaction) {
        return;
    },

    async execute(interaction) {
        await interaction.reply({ embeds: [mediaEmbed.getEmbed(interaction)]})
    },
};