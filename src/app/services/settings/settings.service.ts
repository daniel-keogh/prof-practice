import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

enum Keys {
  Theme = 'theme'
}

enum Themes {
  Dark = 'Dark',
  Light = 'Light',
  System = 'System Default'
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private storage: Storage) {}

  get themes(): typeof Themes {
    return Themes;
  }

  get keys(): typeof Keys {
    return Keys;
  }

  setTheme(theme: string): Promise<any> {
    const isDarkThemePreferred = (): boolean => {
      if (theme === Themes.System) {
        // Use matchMedia to check the user preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return theme === Themes.Dark;
    };

    document.body.classList.toggle('dark', isDarkThemePreferred());

    return this.storage.set(Keys.Theme, theme);
  }

  search(key: string): Promise<any> {
    return this.storage.get(key);
  }

  async restore() {
    this.storage.forEach((value, key) => {
      switch (key) {
        case Keys.Theme:
          this.setTheme(value);
          break;
        default:
          break;
      }
    });
  }
}
