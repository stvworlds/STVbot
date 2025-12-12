const { PermissionsBitField, MessageFlags } = require("discord.js");

module.exports = {
    event: "messageCreate",
    once: false,
    async execute(interaction, client) {
        if (interaction.author.bot) { return; };

        if (interaction.guild === null) { return; };

        if (interaction.member.permissions.has(PermissionsBitField.Flags.MentionEveryone) || interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) { return; };
        if (!(interaction.content.includes("@everyone") || interaction.content.includes("@here"))) { return; };
        
        const logChannel = interaction.guild.channels.cache.get('1404564160867467344');

        if (logChannel && logChannel.isTextBased()) {
            logChannel.send(`<@${interaction.author.id}> надіслав: \n \`\`\`\n${interaction.content}\n\`\`\``)
        }

        const warnMessage = await interaction.reply('У вас немає прав використовувати `@everyone` чи `@here`')

        interaction.delete();

        setTimeout(() => {
            warnMessage.delete().catch(() => {});
        }, 10_000);
    }
}