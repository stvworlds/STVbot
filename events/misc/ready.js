const {time, EmbedBuilder} = require("discord.js");
module.exports = {
    event: 'ready',
    once: true,
    async execute(client) {

        const start_time = () => new Date().toLocaleString('uk-UA', {timeZone: 'Europe/Kyiv'});
        console.log(
        `Ready! Logged in as ${client.user.tag}, 
        at ${client.guilds.cache.size} servers, 
        for a total of ${client.users.cache.size} users, 
        at ${start_time()}`
        );


        const channel = client.channels.cache.get('1218904396465836093');
        if (channel) {
            const embed = new EmbedBuilder()
                .setTitle('Бот запустився 🔫')
                .setDescription(
                    `Гатова! Проснувся як <@${client.user.id}>, 
                     в ${client.guilds.cache.size} серверів, 
                     зареєстровано ${client.users.cache.size} юзерів, 
                     о ${time()}`
                )
                .setColor(0x00AEFF)
                .setTimestamp();

            channel.send({
                embeds: [embed],
                content: "я праснулась"
            });
        }
    }
}