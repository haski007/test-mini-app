const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.TG_BOT_TOKEN);

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

// Start the bot
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
