const gifLink = "https://cdn.discordapp.com/attachments/895957370428088390/1251447104161710110/etodqnyq.gif?ex=67f8ccf0&is=67f77b70&hm=1c55fa5c73520d60aefb62ab59d01b59a0bd0942285f2ae9903955a0e760a095&"
const gifLinkAlt = "https://cdn.discordapp.com/attachments/895957370428088390/1251447104161710110/etodqnyq.gif"

module.exports = {
    event: "messageCreate",
    once: false,
    async execute(interaction, client) {
        if (interaction.content.includes(gifLink) || interaction.content.includes(gifLinkAlt)) {
            const replies = [
                "1) да",
                "2) нет",
                "3) немношка",
                "4) іди нахуй",
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            interaction.reply(randomReply);
        }
    }
}