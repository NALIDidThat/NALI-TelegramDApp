const axios = require('axios');
require('dotenv').config();

const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const BOT_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;
const MINI_APP_URL = process.env.NEXT_PUBLIC_TELEGRAM_MINI_APP_URL;

async function configureTelegramBot() {
  try {
    if (!BOT_TOKEN || !BOT_USERNAME || !MINI_APP_URL) {
      console.error('❌ Missing required environment variables');
      console.log('Please set the following in your .env file:');
      console.log('NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_bot_token');
      console.log('NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=your_bot_username');
      console.log('NEXT_PUBLIC_TELEGRAM_MINI_APP_URL=your_webapp_url');
      return;
    }

    // 1. Set bot commands
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/setMyCommands`, {
      commands: [
        { command: 'start', description: 'Start the NALI experience' },
        { command: 'help', description: 'Get help with NALI' },
        { command: 'menu', description: 'Open the NALI menu' }
      ]
    });

    // 2. Set bot description
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/setMyDescription`, {
      description: 'Welcome to NALI - Your personal journey to growth and community impact starts here!'
    });

    // 3. Set bot short description
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/setMyShortDescription`, {
      short_description: 'Personal development and community impact platform'
    });

    // 4. Set bot menu button
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/setChatMenuButton`, {
      menu_button: {
        type: 'web_app',
        text: 'Open NALI',
        web_app: {
          url: MINI_APP_URL
        }
      }
    });

    console.log('✅ Telegram bot configuration completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Go to @BotFather on Telegram');
    console.log('2. Use the command /newapp');
    console.log('3. Select your bot');
    console.log(`4. Use this URL for your Mini App: ${MINI_APP_URL}`);
    console.log('5. Test your bot by searching for it on Telegram');
    console.log(`6. Open the Mini App using the "Open NALI" button in the bot menu`);

  } catch (error) {
    console.error('❌ Error configuring Telegram bot:', error.response?.data || error.message);
    console.log('\nMake sure you have:');
    console.log('1. Created a bot using @BotFather');
    console.log('2. Added your bot token to .env');
    console.log('3. Added your bot username to .env');
    console.log('4. Added your Mini App URL to .env');
  }
}

configureTelegramBot(); 