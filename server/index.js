import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import TelegramBot from 'node-telegram-bot-api';
import { User } from './models/user.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const WEB_APP_URL = process.env.WEB_APP_URL || `http://localhost:${port}`;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API Routes
app.get('/api/influencer/:username', async (req, res) => {
  try {
    const influencer = await User.findOne({ username: req.params.username });
    if (!influencer) {
      return res.status(404).json({ message: 'Influencer not found' });
    }
    res.json(influencer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Telegram Bot Commands
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const keyboard = {
    inline_keyboard: [
      [{ text: 'Open SparkGate App', web_app: { url: WEB_APP_URL } }]
    ]
  };
  
  bot.sendMessage(chatId, 'Welcome to SparkGate! Click below to open our app:', {
    reply_markup: keyboard
  });
});

bot.onText(/\/profile (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const username = match[1];
  
  try {
    const influencer = await User.findOne({ username });
    if (!influencer) {
      bot.sendMessage(chatId, 'Influencer not found');
      return;
    }
    
    const keyboard = {
      inline_keyboard: [
        [{ 
          text: 'View Full Profile', 
          web_app: { url: `${WEB_APP_URL}/influencer?username=${influencer.username}` } 
        }]
      ]
    };
    
    const message = `
Profile: ${influencer.name}
Username: @${influencer.username}
Twitter Score: ${influencer.twitterScore.total}
    `;
    
    bot.sendMessage(chatId, message, {
      reply_markup: keyboard
    });
  } catch (error) {
    bot.sendMessage(chatId, 'Error fetching influencer profile');
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});