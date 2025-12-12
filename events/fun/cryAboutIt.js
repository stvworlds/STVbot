module.exports = {
    event: 'messageCreate',
    once: false,
    async execute(interaction, client) {
        if (interaction.author.bot) return;

        const content = interaction.content.toLowerCase();
        if (content.includes("поплач")) {
            const replies = [
                "Ок",
                "Жесть",
                "Ого :thumbsup:",
                "Дінаху",
                "Без негатівчика пж",
				"Потужно",
				"https://tenor.com/view/derpy-my-little-pony-mlp-gif-23904446",
                "https://media.discordapp.net/attachments/1158068979869429884/1168559718130794627/ezgif-3-549f5018b6.gif?ex=67f9298b&is=67f7d80b&hm=3885d00f502740f0fe8b096f9b6671a5913aea8f18dd0585101efa89de9f75ff&",
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            interaction.reply(randomReply);
        }
    }
}