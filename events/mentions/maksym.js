module.exports = {
    event: 'messageCreate',
    once: false,
    async execute(interaction, client) {
        if (interaction.author.bot) { return; }
        if (interaction.content.includes('<@569423174576635945')) {
            const replies = [
                "Шо",
                "Шо таке?",
                "А?",
                "Пиши в https://discord.com/channels/1114276509146959982/1114499770665406556 , або в https://discord.com/channels/1114276509146959982/1133372205330350223",
                "Йоу?",
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            interaction.reply(randomReply);
        }
    }
}