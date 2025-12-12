const { EmbedBuilder } = require("discord.js");
const axios = require('axios');

module.exports = {
    async getEmbed() {
        const response = await axios.get('https://cataas.com/cat?json=true');
        const catUrl = `https://cataas.com/cat/${response.data.id}`;


        return new EmbedBuilder()
            .setTitle("Котик")
            .setImage(catUrl)
            .setColor(0x00AEFF)
            .setTimestamp();
    }
}
