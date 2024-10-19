const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.TG_BOT_TOKEN);

// Start command
bot.command('start', (ctx) => {
    ctx.reply('Welcome! Click the button to connect to Abstract.', {
        reply_markup: {
            keyboard: [[{ text: 'Connect to Abstract', web_app: { url: process.env.WEB_APP_URL } }]],
            resize_keyboard: true
        }
    });
});

// Handle web_app_data
bot.on('web_app_data', async (ctx) => {
    try {
        console.log('Received web_app_data:', ctx.webAppData);
        
        let data;
        if (typeof ctx.webAppData.data.text === 'function') {
            const rawData = await ctx.webAppData.data.text();
            console.log('Raw data:', rawData);
            data = JSON.parse(rawData);
        } else {
            data = ctx.webAppData.data;
        }

        console.log('Parsed data:', data);

        if (data.action === 'connected') {
            ctx.reply(`Successfully connected to Abstract!\nYour address: ${data.address}`);
        } else if (data.action === 'error') {
            ctx.reply(`Error connecting to Abstract: ${data.message}`);
        } else {
            ctx.reply('Received unknown data from the mini app.');
        }
    } catch (error) {
        console.error('Error processing web_app_data:', error);
        ctx.reply('Sorry, there was an error processing your request.');
    }
});

// Log errors
bot.catch((err, ctx) => {
    console.error(`Error for ${ctx.updateType}:`, err);
});

// Start the bot
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
