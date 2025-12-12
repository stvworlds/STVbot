const { EmbedBuilder } = require("discord.js");

module.exports = {
    getEmbed(interaction) {
        return new EmbedBuilder()
            .setDescription(
                "В розробці 🛠️"
            )
    }
}