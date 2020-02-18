import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private alertController: AlertController,
    private auth: AuthService
  ) { }

  ngOnInit() {
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
