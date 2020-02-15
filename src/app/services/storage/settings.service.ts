import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

enum Keys {
  Theme = 'theme'
}

enum Themes {
  Dark = 'Dark',
  Light = 'Light'
  // System = 'System'
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
    return this.storage.set(
      Keys.Theme,
      document.body.classList.toggle('dark', theme === Themes.Dark)
        ? Themes.Dark
        : Themes.Light
    );
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
