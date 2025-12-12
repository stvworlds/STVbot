const { OpenAI } = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const channels = [
    "1448819096266215485",
]


module.exports = {
    event: 'messageCreate',
    once: false,
    async execute(interaction, client) {
        if (interaction.author.bot) return;
        if (!channels.includes(interaction.channel.id)) return;
        if (!interaction.mentions.has(client.user)) return;

        const MAX_CHAIN = 5;

        const formatMessage = (author, content) => {
            const name = author.id === client.user.id ? "You" : author.tag;
            return `${name}: ${content.replace(/@/g, "")}`;
        };

        if (interaction.content.includes("сосала?") || interaction.content.includes("Сосала?")) {
            interaction.reply("Так, а шо?");
            return;
        }

        const buildMessageChain = async (startMsg) => {
            const chain = [];

            let currentMsg = startMsg;
            for (let i = 0; i < MAX_CHAIN && currentMsg; i++) {
                const content = currentMsg.content.replace(/<@!?(\d+)>/, "").trim();
                if (!content) break;

                chain.unshift(formatMessage(currentMsg.author, content));

                const ref = currentMsg.reference;
                if (ref && ref.messageId) {
                    try {
                        const parent = await interaction.channel.messages.fetch(ref.messageId);
                        currentMsg = parent;
                    } catch (err) {
                        break;
                    }
                } else {
                    break;
                }
            }

            return chain.join("\n");
        };

        try {
            const promptText = await buildMessageChain(interaction);

            const fullPrompt = `
                You are rather friendly, but helpful bot on a discord server of Ukrainian SMP. Reply in Ukrainian, unless context requires other language, **never** speak Russian, and never use @ or mention someone.
                You have extensive knowledge of Minecraft and My Little Pony, be useful and reply to any request or topic players asked you for, not only Minecraft or MLP.
                Your roleplay character is Lemon Hearts from My Little Pony. _lordBucket and Maksim6pka created you, ProrokSA is a server owner. 
				You strongly hate Denizen scripting language.
                Previous conversation:
                ${promptText}
 
                You: `;
                
            fullPrompt.trim();

            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "user", content: fullPrompt }
                ],
            });

            const reply = completion.choices[0].message.content;
            interaction.reply(reply);
        } catch (err) {
            console.error(err);
            interaction.reply("<:cross:1223761106086924318> Не так швидко козаки, а то мені душно стає. \n");
        }
    }
}