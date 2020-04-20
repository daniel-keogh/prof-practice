import { Theme } from './services/settings/theme.enum';
import { PickerColumnOption } from '@ionic/core';

export default class Utils {
  static genPickerRange(length: number): PickerColumnOption[] {
    // Generate an array of `length` numbers, starting from 0
    // Reference: https://stackoverflow.com/a/44957114
    return Array(length + 1)
      .fill(0)
      .map((x, y) => {
        const num = x + y;

        return {
          text: num + '',
          value: num,
        };
      });
  }

  // Returns true if the user prefers to use a dark theme
  static isDarkThemePreferred(theme: Theme): boolean {
    if (theme === Theme.System) {
      // Use matchMedia to check the user's preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return theme === Theme.Dark;
  }
}
