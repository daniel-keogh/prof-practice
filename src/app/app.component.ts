import { UserService } from './services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { SettingsService } from './services/settings/settings.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Capacitor, Plugins } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private platform: Platform,
    private router: Router,
    private settings: SettingsService,
    private userService: UserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }

      this.auth.checkToken().then(async () => {
        this.userService.user = await this.auth.getDecodedToken();

        this.auth.authState.subscribe(state => {
          if (!state) {
            this.router.navigate(['start-page']);
          } else if (
            ['/login', '/register', '/start-page'].includes(this.router.url)
          ) {
            this.router.navigate(['home']);
          }
        });
      });

      this.settings.restore();
    });
  }
}
