const express = require('express');
const { Telegraf } = require('telegraf');
const path = require('path');
require('dotenv').config();

const bot = new Telegraf(process.env.TG_BOT_TOKEN);
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start command
bot.command('start', (ctx) => {
    ctx.reply('Welcome! Click the button to open the mini app.', {
        reply_markup: {
            keyboard: [[{ text: 'Open Mini App', web_app: { url: process.env.WEB_APP_URL } }]],
            resize_keyboard: true
        }
    });
});

// Handle web_app_data
bot.on('web_app_data', (ctx) => {
    const data = JSON.parse(ctx.webAppData.data);
    ctx.reply(`Received time from mini app: ${data.time}`);
});

// Set up the webhook
app.use(bot.webhookCallback('/secret-path'));

// Serve the mini app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// If using long polling instead of webhooks, uncomment the following line:
// bot.launch();

// Start the bot
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
