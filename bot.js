require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { Provider, Wallet } = require('zksync-ethers');
const { ethers } = require('ethers');

const token = process.env.TG_BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;
const abstractPrivateKey = process.env.ABSTRACT_PRIVATE_KEY;

console.log('Starting bot with token:', token);
console.log('Web App URL:', webAppUrl);

const bot = new TelegramBot(token, { 
  polling: true,
});

bot.on('callback_query', (query) => {
  console.log('Received callback query:', query);
});

// Add this near the top of your file, after creating the bot instance
bot.on('polling_error', (error) => {
  console.log('Polling error:', error);
});

bot.on('webhook_error', (error) => {
  console.log('Webhook error:', error);
});

bot.on('error', (error) => {
  console.log('General error:', error);
});

// Initialize Abstract provider
const provider = new Provider('https://api.testnet.abs.xyz');

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  console.log('Received /start command from chat ID:', chatId);
        
  bot.sendMessage(chatId, 'Welcome! Click the button below to launch the mini-app:', {
    reply_markup: {
      inline_keyboard: [[
        { text: 'Launch Mini App', web_app: { url: webAppUrl } }
      ]]
    }
  }).then(() => {
    console.log('Sent welcome message with Mini App button');
  }).catch((error) => {
    console.error('Error sending welcome message:', error);
  });
});

// Handle web app data
bot.on('web_app_data', async (msg) => {
  console.log('Received web app data event');
  console.log('Full message object:', JSON.stringify(msg, null, 2));
  if (msg.web_app_data) {
    const data = JSON.parse(msg.web_app_data.data);
    if (data.action === 'test_connection') {
      console.log('Received test connection message');
      bot.sendMessage(msg.chat.id, 'Test connection successful!');
    }
    if (data.action === 'connect_abstract') {
      console.log('Attempting to connect to Abstract');
      try {
        const wallet = new Wallet(abstractPrivateKey, provider);
        const address = await wallet.getAddress();
        const balance = await provider.getBalance(address);

        console.log(`Connected to Abstract. Address: ${address}, Balance: ${ethers.formatEther(balance)} ETH`);
        bot.sendMessage(msg.chat.id, `Connected to Abstract!\nAddress: ${address}\nBalance: ${ethers.formatEther(balance)} ETH`)
          .then(() => {
            console.log('Sent connection success message to chat');
          })
          .catch((error) => {
            console.error('Error sending connection success message:', error);
          });
        
        // Send data back to the web app
        console.log('Sending data back to web app');
        bot.sendData(msg.chat.id, JSON.stringify({ status: 'connected', address }))
          .then(() => {
            console.log('Sent data back to web app successfully');
          })
          .catch((error) => {
            console.error('Error sending data back to web app:', error);
          });
      } catch (error) {
        console.error('Error connecting to Abstract:', error);
        bot.sendMessage(msg.chat.id, 'Error connecting to Abstract. Please try again.')
          .then(() => {
            console.log('Sent error message to chat');
          })
          .catch((error) => {
            console.error('Error sending error message:', error);
          });
        
        // Send error data back to the web app
        console.log('Sending error data back to web app');
        bot.sendData(msg.chat.id, JSON.stringify({ status: 'error', message: 'Failed to connect to Abstract' }))
          .then(() => {
            console.log('Sent error data back to web app successfully');
          })
          .catch((error) => {
            console.error('Error sending error data back to web app:', error);
          });
      }
    }
  } else {
    console.log('No web_app_data found in the message');
  }
});

// Add a catch-all handler to log all incoming updates
bot.on('message', (msg) => {
  console.log('Received message:', JSON.stringify(msg, null, 2));
  bot.sendMessage(msg.chat.id, 'I received your message')
    .then(() => {
      console.log('Sent reply to message');
    })
    .catch((error) => {
      console.error('Error sending reply:', error);
    });
});

console.log('Test bot is running...');

// Test bot connection
bot.getMe().then(botInfo => {
  console.log('Bot info:', botInfo);
}).catch(error => {
  console.error('Error getting bot info:', error);
});
