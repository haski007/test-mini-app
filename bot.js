require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TG_BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

const bot = new TelegramBot(token, { polling: true });

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
        
  bot.sendMessage(chatId, 'Welcome! Click the button below to launch the mini-app:', {
    reply_markup: {
      inline_keyboard: [[
        { text: 'Launch Mini App', web_app: { url: webAppUrl } }
      ]]
    }
  });
});

console.log('Bot is running...');