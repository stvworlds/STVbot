

module.exports = {
    event: 'messageCreate',
    once: false,
    async execute(message, client) {

        const news_channel = ["1448817147345375232", "1395397266747166771", "1443261484103630901"];
        const channel = message.channel;

        if (!news_channel.includes(channel.id)) return;
        if (message.channel.isThread()) return

        try {
            await message.crosspost();

            const thread = await channel.threads.create({
                name: `.`,
                startMessage: message.id,
                autoArchiveDuration: 60, // 1 година
                reason: "Автоматичне створення гілки для новини/оновлення"
            });

            await thread.send("Обговорення 🔽");
        } catch (err) {
            console.error("Помилка створення гілки:", err);
        }
    }
}