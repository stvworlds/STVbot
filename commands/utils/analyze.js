const { SlashCommandBuilder } = require('discord.js');
const { OpenAI } = require('openai');
const userCooldowns = new Set();
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('analyze')
        .setDescription('Аналіз краш-логу Minecraft')
        .addAttachmentOption(option =>
            option.setName('logfile')
                .setDescription('Файл логу крашу')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Тип логу (client або server)')
                .setRequired(true)
                .addChoices(
                    { name: 'Client', value: 'client' },
                    { name: 'Server', value: 'server' }
                )),

    async execute(interaction) {
        const file = interaction.options.getAttachment('logfile');
        const type = interaction.options.getString('type');
        const userId = interaction.user.id;

        if (!file || !file.name.endsWith('.txt') && !file.name.endsWith('.log')) {
            return interaction.reply({
                content: '❌ Неправильний формат файлу. Очікується `.txt` або `.log`.',
                ephemeral: true
            });
        }
        if (userCooldowns.has(userId))
            return interaction.reply({
            content: '❌ Ліміт використання аналізатора!.',
            ephemeral: true
        });


        await interaction.deferReply();

        try {
            const response = await fetch(file.url);
            const logText = await response.text();

            const analysis = await analyzeLog(logText, type);
            const chunks = splitMessage(analysis);
            userCooldowns.add(userId);
            setTimeout(() => userCooldowns.delete(userId), 360 * 1000);
            await interaction.editReply(`🔍 Аналіз (${type} лог):\n${chunks[0]}`);

            for (let i = 1; i < chunks.length; i++) {
                await interaction.followUp({ content: chunks[i] });
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply('⚠️ Виникла помилка під час аналізу.');
        }
    }
};

async function analyzeLog(logText, type) {
    const prompt = `Проаналізуй цей ${type === 'server' ? 'серверний' : 'клієнтський'} лог Minecraft 
                    та коротко до 1000 символів поясни можливу причину крашу і способи вирішення:\n\n${logText.slice(0, 4000)} `;

    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 800,
    });

    return response.choices[0].message.content;
}

function splitMessage(text, maxLength = 2000) {
    const lines = text.split('\n');
    const chunks = [];
    let chunk = '';

    for (const line of lines) {
        if ((chunk + '\n' + line).length > maxLength) {
            chunks.push(chunk);
            chunk = line;
        } else {
            chunk += (chunk ? '\n' : '') + line;
        }
    }

    if (chunk.length) chunks.push(chunk);
    return chunks;
}
