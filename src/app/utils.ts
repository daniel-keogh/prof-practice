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
}
