module.exports = {
    info(message, status) {
        const time = "<t:" + Math.floor(Date.now() / 1000000) + 120 + ":R>";
        const memberId = "<@" + message.member + ">";
        return {
            "components": [
                {
                    "type": 17,
                    "accent_color": null,
                    "spoiler": false,
                    "components": [
                        {
                            "type": 9,
                            "components": [
                                {
                                    "type": 10,
                                    "content": "💀 " + memberId + " був помічений як **спамер**. \n✍️ " + status + " \n\n📅 **Видалення** всіх повідомлень за останню годину, через " + time
                                }
                            ],
                            "accessory": {
                                "type": 11,
                                "media": {
                                    "url": message.member.displayAvatarURL({ dynamic: true, size: 1024 })
                                },
                                "description": "123"
                            }
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
                            "label": "Відмінити видалення",
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
