import WebApp from '@twa-dev/sdk';

export const initTelegramWebApp = () => {
  if (typeof window !== 'undefined') {
    // Initialize Telegram Web App
    WebApp.ready();
    
    // Enable closing confirmation
    WebApp.enableClosingConfirmation();
    
    // Set theme parameters
    const themeParams = WebApp.themeParams;
    document.documentElement.style.setProperty('--tg-theme-bg-color', themeParams.bg_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-theme-text-color', themeParams.text_color || '#000000');
    document.documentElement.style.setProperty('--tg-theme-hint-color', themeParams.hint_color || '#999999');
    document.documentElement.style.setProperty('--tg-theme-link-color', themeParams.link_color || '#2481cc');
    document.documentElement.style.setProperty('--tg-theme-button-color', themeParams.button_color || '#2481cc');
    document.documentElement.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color || '#ffffff');
  }
};

export const getTelegramUser = () => {
  if (typeof window !== 'undefined') {
    return WebApp.initDataUnsafe.user;
  }
  return null;
};

export const isTelegramWebApp = () => {
  if (typeof window !== 'undefined') {
    return WebApp.platform !== 'unknown';
  }
  return false;
};

// New utility functions
export const sendDataToBot = (data: any) => {
  if (typeof window !== 'undefined') {
    WebApp.sendData(JSON.stringify(data));
  }
};

export const closeWebApp = () => {
  if (typeof window !== 'undefined') {
    WebApp.close();
  }
};

export const expandWebApp = () => {
  if (typeof window !== 'undefined') {
    WebApp.expand();
  }
};

export const getThemeParams = () => {
  if (typeof window !== 'undefined') {
    return WebApp.themeParams;
  }
  return null;
};

export const showAlert = (message: string) => {
  if (typeof window !== 'undefined') {
    WebApp.showAlert(message);
  }
};

export const showConfirm = (message: string): Promise<boolean> => {
  if (typeof window !== 'undefined') {
    return WebApp.showConfirm(message);
  }
  return Promise.resolve(false);
}; 