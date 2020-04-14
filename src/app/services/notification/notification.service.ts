import { Injectable } from '@angular/core';

import {
  LocalNotifications,
  ELocalNotificationTriggerUnit,
} from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private localNotifications: LocalNotifications) {}

  scheduleDailyNotification() {
    // Cancel any pre-scheduled
    this.localNotifications.cancel(0);

    // Schedule a notification
    this.localNotifications.schedule({
      id: 0,
      foreground: true,
      launch: true,
      title: 'Reminder',
      text: 'Daily reminder to log your progress',
      trigger: {
        in: 1,
        unit: ELocalNotificationTriggerUnit.DAY,
      },
    });
  }
}
