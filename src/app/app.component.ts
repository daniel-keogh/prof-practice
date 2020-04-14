import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { NotificationService } from './services/notification/notification.service';
import { SettingsService } from './services/settings/settings.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Capacitor, Plugins } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // Used for hiding certain items from the side menu if the
  // user is not logged-in
  isLoggedIn = false;

  constructor(
    private auth: AuthService,
    private notif: NotificationService,
    private platform: Platform,
    private router: Router,
    private settings: SettingsService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }

      // Check the user auth token
      this.auth.checkToken().then(() => {
        // Subscribe to the authState in case it ever changes
        this.auth.authState.subscribe((state) => {
          this.isLoggedIn = state;

          if (!state) {
            this.router.navigate(['start-page']);
          } else if (
            ['/login', '/register', '/start-page'].includes(this.router.url)
          ) {
            // Don't go to the above pages if logged-in
            this.router.navigate(['home']);
          }
        });
      });

      this.notif.scheduleDailyNotification();
      this.settings.restore();
    });
  }
}
