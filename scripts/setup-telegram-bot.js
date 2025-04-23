const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const BOT_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;
const MINI_APP_URL = process.env.NEXT_PUBLIC_TELEGRAM_MINI_APP_URL;

async function setupBot() {
  try {
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

    console.log('✅ Bot setup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Go to @BotFather and use /newapp to create a Mini App');
    console.log(`2. Use this URL for your Mini App: ${MINI_APP_URL}`);
    console.log('3. Test your bot by searching for it on Telegram');
    console.log(`4. Open the Mini App using the "Open NALI" button in the bot menu`);

  } catch (error) {
    console.error('❌ Error setting up bot:', error.response?.data || error.message);
    console.log('\nMake sure you have:');
    console.log('1. Created a bot using @BotFather');
    console.log('2. Added your bot token to .env.local');
    console.log('3. Added your bot username to .env.local');
    console.log('4. Added your Mini App URL to .env.local');
  }
}

setupBot(); 