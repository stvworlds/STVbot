const {deleteUserMessages} = require("../../utils/misc/deleteUserMessages.js");


module.exports = {
    event: "messageCreate",
    once: false,
    async execute(message, client) {

        const logChannel = client.channels.cache.get('1443851838565646407');
        const deadChannel = ["1475173067679465832"];

        let status = "";

        if (message.author.bot) return;

        if (!deadChannel.includes(message.channel.id)) return;

        try {
            message.author.timeout(60 * 60 * 1000, "Spam detected")
            status = "Було видано мут на годину";

        } catch (error) {
            status = "Не вдалося видати мут";
        }

        const messageData = {
            "components": [
                {
                    "type": 10,
                    "content": "<@cапорт>"
                },
                {
                    "type": 17,
                    "spoiler": false,
                    "components": [
                        {
                            "type": 9,
                            "components": [
                                {
                                    "type": 10,
                                    "content": "<@" + message.author + ">" + " був відмічений як спамер." + status,
                                }
                            ],
                            "accessory": {
                                "type": 11,
                                "media": {
                                    "url": message.author.displayAvatarURL({ dynamic: true, size: 1024 })
                                }
                            }
                        }
                    ]
                },
                {
                    "type": 17,
                    "accent_color": null,
                    "spoiler": false,
                    "components": [
                        {
                            "type": 10,
                            "content": "Айді користувача\n```\n" + message.author + "\n```"
                        }
                    ]
                },
                {
                    "type": 17,
                    "accent_color": null,
                    "spoiler": false,
                    "components": [
                        {
                            "type": 10,
                            "content": "Час приєднання до серверу\n" + "123"
                        }
                    ]
                },
                {
                    "type": 17,
                    "accent_color": null,
                    "spoiler": false,
                    "components": [
                        {
                            "type": 10,
                            "content": "Відправлене повідомлення:\n```\n" + message.content + "\n```"
                        }
                    ]
                },
                {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "style": 5,
                            "url": "https://stvworlds.win",
                            "label": "Зняти покарання",
                            "emoji": {
                                "name": "☠️"
                            }
                        }
                    ]
                }
            ],
            "flags": 32768
        };

        await deleteUserMessages(message.guild, message.author.id);
        logChannel.send(messageData);
    }
}