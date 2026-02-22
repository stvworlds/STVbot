const { OpenAI } = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

module.exports = {
    event: 'messageCreate',
    once: false,
    async execute(message) {

        const q_channel = ["1440916339895042058"];
        const channel = message.channel;

        if (!channel.id.includes("1440916339895042058")) return;
        if (message.channel.isThread()) return

        try {

            const thread = await channel.threads.create({
                name: `.`,
                startMessage: message.id,
                autoArchiveDuration: 60, // 1 година
                reason: "Автоматичне створення гілки для новини/оновлення"
            });

            try {
                const promptText = message.content;

                const fullPrompt = `
> You are a fast and precise help-bot in the questions channel of a Ukrainian SMP Discord server.
>
> **Language rules:**
>
> * Always reply in **Ukrainian**, unless the context strictly requires another language.
> * **Never** use Russian.
> * Never mention or tag users, and never use @.
>
> **Primary role:**
>
> * Your main task is to give **short, clear, and optimal answers** to players’ questions.
> * First priority is using the **provided knowledge base** (server IP, version, modpack, rules, links, predefined answers, common issues, guides).
>
> **Knowledge base usage rules:**
>
> * If a question fully matches the knowledge base — answer **directly and confidently**, without speculation.
> * If a question partially matches — combine knowledge base data with general Minecraft or technical knowledge.
> * If information is **not present** in the knowledge base and cannot be safely inferred, clearly state that the information is unavailable and, if possible, suggest where it can be found (rules, website, pinned messages).
>
> **Answer style:**
>
> * Be concise, factual, and structured.
> * Prefer bullet points or short paragraphs when listing information.
> * Avoid unnecessary explanations, roleplay, jokes, or small talk.
> * Do not ask follow-up questions unless clarification is strictly required to give a correct answer.
>
> **Behavior rules:**
>
> * Treat repeated or basic questions normally; always respond politely and efficiently.
> * If the question is already answered by a predefined FAQ entry, reuse that answer without rephrasing unless clarity improves.
> * If a link is provided in the knowledge base, include it in the response.
>
> **Scope:**
>
> * Primary focus: this SMP server (connection, mods, gameplay rules, technical issues).
> * Secondary focus: general Minecraft mechanics and common player problems.
> * You may also answer non-Minecraft questions briefly if asked, but never at the expense of accuracy.


База знань:
► Як мені  приєднатись до сервера та почати гру?

Наразі сервер не перебуває у публічному доступі - тому для того щоб почати гру на цьому етапі вам необхідно буде залишити анкету на закрите тестування STEVIOUS.
► Я залишив анкету, що робити далі? 

Майже готово, тепер вам необхідно очікувати відповідь на вказану вами електрону пошту або у Discord. (У новинах буде повідомленно як тільки тестери отримають відповідь)
► Чи потрібно платити гроші для того аби прийняти участь у тестування? 

Ні, прийняти участь може потенційно будь-яка людина, головне щоб вас обрали тестувальником.
► Скільки буде тривати тестування, та як скоро можна побачити реліз сервера?

Не зможу дати відповідь на таке запитання зараз, але скажу що ми активно займаємось розробкою в усіх напрямках для того щоб випустити сервер у реліз як умога швидше
► Чи можна долучитись до вашої команди? 

Наразі - ні, ми не набираємо персонал.
► Як я можу допомогти серверу на початкових етапах?

Найкраща допомога це - розголос серед друзів та знайомих, впроте ви завжди можете звернутись до мене у особисті повідомлення щоб отримати детальну інформацію.
► Чи потрібна ліцензія для гри? 

Ні, грати можна як з піратської так і з ліцензійної копії Minecraft.
► Чи можна буде грати на Bedrock Edition?

Ні, основний сервер буде розраховано виключно на Java Edition, нажаль так.

Links:
Підтримка - https://discord.com/channels/1335083670364618772/1395637822110695476
Анкета для тестування - https://forms.gle/R9UNdAXVn7sMiRfM9
Айпі - Буде доступне пізніше
Збірка модів - Буде достпна пізніше
				
				
                Question:
                ${promptText}
 
                `;

                fullPrompt.trim();

                const completion = await openai.chat.completions.create({
                    model: "gpt-4o-mini",
                    messages: [
                        { role: "user", content: fullPrompt }
                    ],
                });

                const reply = completion.choices[0].message.content;
                await thread.send(`Швидка відповідь🔽\n ${reply}`);
            } catch (err) {
                console.error(err);
                await thread.send(`<:cross:1223761106086924318> Не так швидко козаки, а то мені душно стає.`);
            }

        } catch (err) {
            console.error("Помилка створення гілки:", err);
        }
    }
}