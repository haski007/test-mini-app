import { useEffect, useState } from 'react';

export const useTelegram = () => {
  const [webApp, setWebApp] = useState(window.Telegram?.WebApp);

  useEffect(() => {
    if (webApp) {
      webApp.ready();
    }
  }, [webApp]);

  const showMainButton = (text: string, callback: () => void) => {
    if (webApp) {
      webApp.MainButton.text = text;
      webApp.MainButton.onClick(callback);
      webApp.MainButton.show();
    }
  };

  const hideMainButton = () => {
    if (webApp) {
      webApp.MainButton.hide();
    }
  };

  const close = () => {
    if (webApp) {
      webApp.close();
    }
  };

  return {
    webApp,
    showMainButton,
    hideMainButton,
    close,
    platform: webApp?.platform,
    colorScheme: webApp?.colorScheme,
    themeParams: webApp?.themeParams,
  };
};