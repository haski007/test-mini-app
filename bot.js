import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TG_BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === '/start') {
    await bot.sendMessage(chatId, 'Welcome to Spark Gate app!', {
      reply_markup: {
        keyboard: [
          [{ text: 'Open Spark Gate app', web_app: { url: webAppUrl } }]
        ],
        resize_keyboard: true
      }
    });
  }
});

console.log('Bot is running...');
