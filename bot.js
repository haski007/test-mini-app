require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { Provider, Wallet } = require('zksync-ethers');
const { ethers } = require('ethers');

const token = process.env.TG_BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;
const abstractPrivateKey = process.env.ABSTRACT_PRIVATE_KEY;

const bot = new TelegramBot(token, { polling: true });

// Initialize Abstract provider
const provider = new Provider('https://api.testnet.abs.xyz');

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

// Handle web app data
bot.on('web_app_data', async (msg) => {
  const chatId = msg.chat.id;
  const data = JSON.parse(msg.web_app_data.data);

  if (data.action === 'connect_abstract') {
    try {
      const wallet = new Wallet(abstractPrivateKey, provider);
      const address = await wallet.getAddress();
      const balance = await provider.getBalance(address);

      bot.sendMessage(chatId, `Connected to Abstract!\nAddress: ${address}\nBalance: ${ethers.formatEther(balance)} ETH`);
      
      // Send data back to the web app
      bot.sendData(chatId, JSON.stringify({ status: 'connected', address }));
    } catch (error) {
      console.error('Error connecting to Abstract:', error);
      bot.sendMessage(chatId, 'Error connecting to Abstract. Please try again.');
      
      // Send error data back to the web app
      bot.sendData(chatId, JSON.stringify({ status: 'error', message: 'Failed to connect to Abstract' }));
    }
  }
});

console.log('Bot is running...');
