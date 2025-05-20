import WebApp from '@twa-dev/sdk';

export const initTelegramWebApp = () => {
  if (typeof window !== 'undefined') {
    // Initialize Telegram Web App
    WebApp.ready();
    
    // Enable closing confirmation
    WebApp.enableClosingConfirmation();
    
    // Set theme parameters
    if (WebApp.themeParams) {
      document.documentElement.style.setProperty('--tg-theme-bg-color', WebApp.themeParams.bg_color || '#ffffff');
      document.documentElement.style.setProperty('--tg-theme-text-color', WebApp.themeParams.text_color || '#000000');
      document.documentElement.style.setProperty('--tg-theme-hint-color', WebApp.themeParams.hint_color || '#999999');
      document.documentElement.style.setProperty('--tg-theme-link-color', WebApp.themeParams.link_color || '#2481cc');
      document.documentElement.style.setProperty('--tg-theme-button-color', WebApp.themeParams.button_color || '#2481cc');
      document.documentElement.style.setProperty('--tg-theme-button-text-color', WebApp.themeParams.button_text_color || '#ffffff');
    }
  }
};

export const getTelegramUser = () => {
  if (typeof window !== 'undefined' && WebApp.initDataUnsafe && WebApp.initDataUnsafe.user) {
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

// Utility functions
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
    const tg = window.Telegram?.WebApp || WebApp;
    const version = tg?.version || "0.0";
    function isVersionAtLeast(current: string, required: string) {
      const c = current.split('.').map(Number);
      const r = required.split('.').map(Number);
      for (let i = 0; i < r.length; i++) {
        if ((c[i] || 0) > r[i]) return true;
        if ((c[i] || 0) < r[i]) return false;
      }
      return true;
    }
    if (isVersionAtLeast(version, "6.1") && typeof tg.showAlert === "function") {
      tg.showAlert(message);
    } else {
      window.alert(message);
    }
  } else {
    alert(message);
  }
};

export const showConfirm = (message: string): Promise<boolean> => {
  if (typeof window !== 'undefined') {
    return new Promise((resolve) => {
      WebApp.showConfirm(message, (confirmed) => {
        resolve(confirmed);
      });
    });
  }
  return Promise.resolve(false);
}; 