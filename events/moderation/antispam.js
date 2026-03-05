const {deleteUserMessages} = require("../../utils/misc/deleteUserMessages.js");
const {info} = require("../../components/antispam/info.js");
const {PermissionsBitField} = require("discord.js");
const {adminLog} = require("../../components/antispam/adminlog");


module.exports = {
    event: "messageCreate",
    once: false,
    async execute(message, client, token) {

        const logChannel = client.channels.cache.get('1443851838565646407');
        const deadChannel = ["1475173067679465832"];

        let status = "";

        if (message.author.bot) return;

        if (!deadChannel.includes(message.channel.id)) return;

        if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            status = "Не вдалося видати мут";
        } else {
            try {
                message.member.timeout(60 * 60 * 1000, "Spam detected")
                    .then(status = "Було видано мут на годину")
            } catch(err) {
                status = "Не вдалося видати мут"
            }
        }


        const messageData = adminLog(message, status)

        try {
            await message.channel.send(info(message, status));
        } catch (e) {
            console.error(e);
        }


        setTimeout(async () => {

            await deleteUserMessages(
                message.guildId,
                message.member.id,
                process.env.BOT_TOKEN
            );

            logChannel.send(messageData);

        }, 2 * 60 * 1000);
    }
}