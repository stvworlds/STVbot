const {
    Client,
    GatewayIntentBits
} = require("discord.js");
require('dotenv').config();

const GUILD_ID = "1335083670364618772";        // ID гільдії
const CHANNEL_ID = "1443343285346369706";    // ID каналу


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

client.once("ready", async () => {
    console.log(`Бот запущений як ${client.user.tag}`);

    const guild = await client.guilds.fetch(GUILD_ID);
    const channel = await guild.channels.fetch(CHANNEL_ID);

    if (!channel) {
        console.log("Канал не знайдено.");
        return;
    }
//  норм сайт для генерації - https://discordlabs.org/tools/component-builder, чат гпт по ції хуйні не шарить ваще
    const messageData = {
        "components": [
            {
                "type": 12,
                "items": [
                    {
                        "media": {
                            "url": "https://cdn.discordapp.com/attachments/1441126594080018613/1443861926840111187/Frame_20.png?ex=693c68f5&is=693b1775&hm=227b250722849b978376cf79e10fb3825001a32b3053af161fd928853e5a66d1&"
                        },
                        "description": "Stevious",
                        "spoiler": false
                    }
                ]
            },
            {
                "type": 17,
                "accent_color": 15809022,
                "spoiler": false,
                "components": [

                    {
                        "type": 10,
                        "content": "# Популярні питання\nУ цьому каналі дам одразу відповіді на усі питання стосовно сервера."
                    },
                    {
                        "type": 14,
                        "spacing": 2,
                        "divider": true
                    },
                    {
                        "type": 9,
                        "components": [
                            {
                                "type": 10,
                                "content": "***► Як мені  приєднатись до сервера та почати гру?***\n\nНаразі сервер **не перебуває** у публічному доступі - тому для того щоб почати гру на цьому етапі вам необхідно буде **залишити анкету** на закрите тестування STEVIOUS."
                            }
                        ],
                        "accessory": {
                            "type": 2,
                            "style": 5,
                            "url": "https://forms.gle/R9UNdAXVn7sMiRfM9",
                            "label": "Форма заявки",
                            "emoji": {
                                "name": "✅"
                            }
                        }
                    },
                    {
                        "type": 14,
                        "spacing": 1,
                        "divider": true
                    },
                    {
                        "type": 10,
                        "content": "***► Я залишив анкету, що робити далі?*** \n\nМайже готово, тепер вам необхідно **очікувати** відповідь на вказану вами електрону пошту або у Discord. (У новинах буде повідомленно як тільки тестери **отримають** відповідь)"
                    },
                    {
                        "type": 14,
                        "spacing": 1,
                        "divider": true
                    },
                    {
                        "type": 10,
                        "content": "***► Чи потрібно платити гроші для того аби прийняти участь у тестування?*** \n\nНі, прийняти участь може потенційно **будь-яка людина**, головне щоб вас обрали тестувальником."
                    },
                    {
                        "type": 14,
                        "spacing": 1,
                        "divider": true
                    },
                    {
                        "type": 10,
                        "content": "***► Скільки буде тривати тестування, та як скоро можна побачити реліз сервера?***\n\nНе зможу дати відповідь на таке запитання зараз, але скажу що ми **активно займаємось розробкою** в усіх напрямках для того щоб випустити сервер у реліз **як умога швидше**"
                    },
                    {
                        "type": 14,
                        "spacing": 1,
                        "divider": true
                    },
                    {
                        "type": 10,
                        "content": "***► Чи можна долучитись до вашої команди?*** \n\nНаразі - ні, ми **не набираємо** персонал."
                    },
                    {
                        "type": 14,
                        "spacing": 1,
                        "divider": true
                    },
                    {
                        "type": 10,
                        "content": "***► Як я можу допомогти серверу на початкових етапах?***\n\nНайкраща допомога це - **розголос серед друзів та знайомих**, впроте ви завжди можете звернутись до мене у **особисті повідомлення** щоб отримати детальну інформацію."
                    },
                    {
                        "type": 14,
                        "spacing": 1,
                        "divider": true
                    },
                    {
                        "type": 10,
                        "content": "***► Чи потрібна ліцензія для гри? \n\n***Ні, грати можна як з **піратської** так і з **ліцензійної** копії Minecraft."
                    },
                    {
                        "type": 14,
                        "spacing": 1,
                        "divider": true
                    },
                    {
                        "type": 10,
                        "content": "***► Чи можна буде грати на Bedrock Edition?***\n\nНі, основний сервер буде розраховано виключно на **Java Edition**, нажаль так."
                    },
                    {
                        "type": 14,
                        "spacing": 1,
                        "divider": true
                    },
                    {
                        "type": 9,
                        "components": [
                            {
                                "type": 10,
                                "content": "# Текст писав ваш AcuraON!\n\n p.s Якщо я забув щось, то буду доповнювати цей канал - можете пропонувати свої ідеї у особистих повідомленнях"
                            }
                        ],
                        "accessory": {
                            "type": 11,
                            "media": {
                                "url": "https://cdn.discordapp.com/guilds/1335083670364618772/users/972973957147942932/avatars/e5b40acb7b59310bb0c98c22cdfd86ba.webp?size=1024"
                            },
                            "description": "AcuraON"
                        }
                    },
                    {
                        "type": 14,
                        "spacing": 1,
                        "divider": true
                    },
                    {
                        "type": 1,
                        "components": [
                            {
                                "type": 2,
                                "style": 5,
                                "url": "https://discord.com/channels/1335083670364618772/1395397413195223141",
                                "label": "Правила",
                                "emoji": {
                                    "name": "📌"
                                }
                            },
                            {
                                "type": 2,
                                "style": 5,
                                "url": "https://discord.com/channels/1335083670364618772/1395397266747166771",
                                "label": "Новини",
                                "emoji": {
                                    "name": "🔔"
                                }
                            },
                            {
                                "type": 2,
                                "style": 5,
                                "url": "https://discord.com/channels/1335083670364618772/1395637822110695476",
                                "label": "Підтримка",
                                "emoji": {
                                    "name": "📫"
                                }
                            },
                            {
                                "type": 2,
                                "style": 5,
                                "url": "https://discord.com/channels/1335083670364618772/1443261484103630901",
                                "label": "Відгуки",
                                "emoji": {
                                    "name": "🤝"
                                }
                            }

                        ]
                    }
                ]
            },

        ],
        "flags": 32768
    };

    await channel.send(messageData);

    console.log("Повідомлення успішно відправлено.");
});

client.login(process.env.BOT_TOKEN);
