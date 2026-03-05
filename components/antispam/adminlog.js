module.exports = {
    adminLog(message, status) {

        const memberId = "<@" + message.member + ">";

        return {
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
                                    "content": memberId + " був відмічений як спамер. " + status,
                                }
                            ],
                            "accessory": {
                                "type": 11,
                                "media": {
                                    "url": message.member.displayAvatarURL({ dynamic: true, size: 1024 })
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
                            "content": "Айді користувача\n```\n" + message.member + "\n```"
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
                            "content": "Час приєднання до серверу\n" + "<t:" + Math.floor(message.member.joinedTimestamp / 1000) + ":R>"
                        }
                    ]
                },
                {
                    "type": 17,
                    "accent_color": null,
                    "spoiler": true,
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
    }
}
