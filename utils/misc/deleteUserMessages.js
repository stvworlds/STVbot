const { ChannelType, PermissionsBitField } = require('discord.js');

async function deleteUserMessages(guild, userId) {
    const oneHourAgo = Date.now() - (60 * 60 * 1000);

    for (const channel of guild.channels.cache.values()) {
        if (channel.type !== ChannelType.GuildText) continue;

        if (!channel.permissionsFor(guild.members.me).has(PermissionsBitField.Flags.ManageMessages)) continue;

        try {
            let fetched;
            let lastId;

            do {
                fetched = await channel.messages.fetch({
                    limit: 100,
                    before: lastId
                });

                const filtered = fetched.filter(msg =>
                    msg.author.id === userId &&
                    msg.createdTimestamp > oneHourAgo
                );

                await Promise.all(filtered.map(msg => msg.delete().catch(() => {})));

                lastId = fetched.last()?.id;
            } while (fetched.size === 100);

        } catch (err) {
            console.log(`No access to ${channel.name}`);
        }
    }
}

module.exports = { deleteUserMessages };