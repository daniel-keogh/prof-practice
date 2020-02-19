import { AlertController } from '@ionic/angular';
import { User } from './../../interfaces/user';
import { SettingsService } from '../../services/settings/settings.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  private theme: string;
  private user: User;

  constructor(
    private alertController: AlertController,
    private auth: AuthService,
    private settings: SettingsService
  ) { }

  async ngOnInit() {
    this.theme =
      (await this.settings.search(this.settings.keys.Theme)) ||
      this.settings.themes.Light;

    this.user = await this.auth.getDecodedToken();
  }

  onThemeChanged() {
    this.settings.setTheme(this.theme);
  }

  onChangePwdClicked() {
    // TODO 
  }

  async onCloseAccountClicked() {
    const alert = await this.alertController.create({
      header: 'Close your account?',
      message: 'Enter your password to confirm.',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'OK',
          handler: (input) => {
            if (input) {
              this.auth.closeAccount(input.password);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
