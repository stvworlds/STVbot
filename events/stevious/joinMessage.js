const messageData = require("../../embeds/stevious/utils/joinMessage.js");

module.exports = {
    event: 'guildMemberAdd',
    once: true,
    async execute(interaction, client) {
        try {

            await interaction.send(messageData(interaction))
        } catch (error) {
            console.error(`❌ Failed to DM user ${interaction.user.tag}:`, error);
        }
    }
}