import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { SettingsService } from './services/settings/settings.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
    private splashScreen: SplashScreen,
    private settings: SettingsService,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.auth.checkToken()
        .then(() => {
          this.auth.authState.subscribe(state => {
            if (!state) {
              //this.router.navigate(['start-page']);
            } else if (['/login', '/register', '/start-page'].includes(this.router.url)) {
              //this.router.navigate(['home']);
            }
          })
        });

      this.settings.restore();
    });
  }
}
