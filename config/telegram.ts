export const TELEGRAM_CONFIG = {
  // Replace with your bot token from @BotFather
  BOT_TOKEN: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '',
  
  // Replace with your bot username (without @)
  BOT_USERNAME: process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || '',
  
  // Replace with your Mini App URL (use ngrok URL for development)
  MINI_APP_URL: process.env.NEXT_PUBLIC_TELEGRAM_MINI_APP_URL || '',
  
  // Web App configuration
  WEB_APP: {
    // Keep our brand color for buttons
    BUTTON_COLOR: '#FF0099',
    BUTTON_TEXT_COLOR: '#FFFFFF',
    
    // Default theme colors (will be overridden by Telegram's theme)
    DEFAULT_THEME: {
      bg_color: '#FFFFFF',
      text_color: '#000000',
      hint_color: '#999999',
    },
  },
} 