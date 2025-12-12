const { EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
    async getEmbed() {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random');
        const dogUrl = `${response.data.message}`;


        return new EmbedBuilder()
            .setTitle("Cобачка")
            .setImage(dogUrl)
            .setColor(0x00AEFF)
            .setTimestamp();
    }
}