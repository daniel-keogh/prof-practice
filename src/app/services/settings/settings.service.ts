import { Setting } from './setting.enum';
import { Theme } from './theme.enum';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private storage: Storage) {}

  setTheme(theme: Theme): Promise<any> {
    const isDarkThemePreferred = (): boolean => {
      if (theme === Theme.System) {
        // Use matchMedia to check the user's preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return theme === Theme.Dark;
    };

    document.body.classList.toggle('dark', isDarkThemePreferred());

    return this.storage.set(Setting.Theme, theme);
  }

  search(key: Setting): Promise<any> {
    return this.storage.get(key);
  }

  async restore() {
    this.storage.forEach((value, key) => {
      switch (key) {
        case Setting.Theme:
          this.setTheme(value);
          break;
        default:
          break;
      }
    });
  }
}
