const { EmbedBuilder } = require("discord.js");

module.exports = {
    getEmbed(interaction) {
        const ping = interaction.client.ws.ping;

        return new EmbedBuilder()
            .setDescription(
                "🏓 Понг\n" +
                ":incoming_envelope: Пінг `" + `${ping}` + "`мс"
            )
            .setColor(0x00AEFF)
            .setTimestamp();
    }
}