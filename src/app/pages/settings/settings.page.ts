import { ChangeEmailComponent } from './../../components/change-email/change-email.component';
import { ChangePasswordComponent } from './../../components/change-password/change-password.component';
import { AlertController, ModalController } from '@ionic/angular';
import { Setting } from '../../services/settings/setting.enum';
import { Theme } from '../../services/settings/theme.enum';
import { SettingsService } from '../../services/settings/settings.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  private theme: Theme;

  constructor(
    private alertController: AlertController,
    private auth: AuthService,
    private modalCtrl: ModalController,
    private settings: SettingsService
  ) {}

  async ngOnInit() {
    this.theme = (await this.settings.search(Setting.Theme)) || Theme.Light;
  }

  get themes() {
    return Theme;
  }

  onThemeChanged() {
    this.settings.setTheme(this.theme);
  }

  onChangePwdClicked() {
    this.modalCtrl
      .create({
        component: ChangePasswordComponent
      })
      .then(modal => {
        modal.present();
      });
  }

  onChangeEmailClicked() {
    this.modalCtrl
      .create({
        component: ChangeEmailComponent
      })
      .then(modal => {
        modal.present();
      });
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
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: input => {
            if (input.password) {
              this.auth.closeAccount(input.password).catch(err => {
                if (err.status === 401) {
                  err.error.msg = 'User password is incorrect';
                }

                this.alertController
                  .create({
                    header: err.statusText,
                    message: err.error.msg,
                    buttons: ['OK']
                  })
                  .then(alert => {
                    alert.present();
                  });
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
