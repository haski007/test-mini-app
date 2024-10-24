declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready(): void;
        close(): void;
        expand(): void;
        MainButton: {
          text: string;
          show(): void;
          hide(): void;
          onClick(fn: () => void): void;
          offClick(fn: () => void): void;
          enable(): void;
          disable(): void;
        };
        BackButton: {
          show(): void;
          hide(): void;
          onClick(fn: () => void): void;
        };
        themeParams: {
          bg_color: string;
          text_color: string;
          hint_color: string;
          button_color: string;
          button_text_color: string;
        };
        platform: string;
        colorScheme: 'light' | 'dark';
      };
    };
  }
}

export {};