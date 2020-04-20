import { Setting } from './setting.enum';
import { Theme } from './theme.enum';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import Utils from 'src/app/utils';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private storage: Storage) {}

  setTheme(theme: Theme): Promise<any> {
    // Toggle the dark theme CSS classes
    document.body.classList.toggle('dark', Utils.isDarkThemePreferred(theme));

    return this.storage.set(Setting.Theme, theme);
  }

  search(key: Setting): Promise<any> {
    return this.storage.get(key);
  }

  restore() {
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
