const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);

// Динамічний fetch для Node.js 18+
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


module.exports = {
    data: new SlashCommandBuilder()
        .setName('convert')
        .setDescription('Конвертує PNG або JPG у GIF')
        .addAttachmentOption(option => option
                .setName('foto')
                .setDescription('Фото яке потрібно конвертувати')
                .setRequired(true)
        ),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const attachment = interaction.options.getAttachment('foto');
            const fileUrl = attachment.url;
            const fileName = `input-${Date.now()}`;
            const ext = path.extname(attachment.name);
            const inputPath = path.join(__dirname, `${fileName}${ext}`);
            const outputPath = path.join(__dirname, `${fileName}.gif`);
            const palettePath = path.join(__dirname, `${fileName}-palette.png`);

            // Завантаження зображення
            const response = await fetch(fileUrl);
            const buffer = await response.arrayBuffer();
            fs.writeFileSync(inputPath, Buffer.from(buffer));

            // Генерація палітри
            ffmpeg(inputPath)
                .outputOptions(['-vf', 'palettegen', '-y'])
                .output(palettePath)
                .on('end', () => {
                    // Використання палітри для створення чистої GIF
                    ffmpeg(inputPath)
                        .input(palettePath)
                        .outputOptions(['-lavfi', 'paletteuse', '-y'])
                        .output(outputPath)
                        .on('end', async () => {
                            const gif = new AttachmentBuilder(outputPath, { name: 'converted.gif' });
                            await interaction.editReply({ content: 'GIF:', files: [gif] });

                            // Видалення тимчасових файлів
                            [inputPath, outputPath, palettePath].forEach(f => {
                                if (fs.existsSync(f)) fs.unlinkSync(f);
                            });
                        })
                        .on('error', async (err) => {
                            console.error('Помилка paletteuse:', err);
                            await interaction.editReply('Помилка при зменшенні шуму GIF.');
                        })
                        .run();
                })
                .on('error', async (err) => {
                    console.error('Помилка palettegen:', err);
                    await interaction.editReply('Помилка при створенні палітри.');
                })
                .run();

        } catch (err) {
            console.error('Помилка виконання команди convert:', err);
            if (!interaction.replied) {
                await interaction.editReply('Виникла помилка при обробці запиту.');
            }
        }
    }
};
