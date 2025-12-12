const embedSource = require('../../../embeds/stevious/info/modpack')

module.exports = {
    event: 'messageCreate',
    once: false,
    async execute(interaction, client) {
        if (interaction.author.bot) return;

        const channels = ["1395638271391825960"];
        if (!channels.includes(interaction.channel.id)) return;
        
        const content = interaction.content.toLowerCase();
        const keywords = ["збірка", "модпак"];
        if (keywords.some(keyword => content.includes(keyword))) {
            if (interaction.author.bot) return;
        
            const embed = embedSource.getEmbed(interaction)
            interaction.reply({ embeds: [embed] });
        }
    }
}