module.exports = {
    event: 'messageCreate',
    once: false,
    async execute(interaction, client) {
        if (interaction.author.bot) { return; }
        
        if (interaction.content.includes('<@972973957147942932>')) {
            interaction.reply('https://tenor.com/view/hector-gif-11253742');
        }
    }
}