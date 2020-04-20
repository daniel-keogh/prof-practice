import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  ToastController,
  AlertController,
} from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  name: string;

  constructor(
    private alertController: AlertController,
    private modal: ModalController,
    private userService: UserService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.name = this.userService.user.name;
  }

  dismiss() {
    this.modal.dismiss();
  }

  async changeImage() {
    const alert = await this.alertController.create({
      header: 'Change Profile Image',
      message: 'Enter the URL of the new Image.',
      inputs: [
        {
          name: 'image',
          type: 'text',
          placeholder: '',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: (input) => {
            if (input.image) {
              this.userService
                .updateUser({
                  profileImage: input.image,
                })
                .toPromise()
                .catch((err) => {
                  // Show error message
                  this.alertController
                    .create({
                      header: err.error.msg,
                      buttons: ['OK'],
                    })
                    .then((alert) => {
                      alert.present();
                    });
                });
            }
          },
        },
      ],
    });

    await alert.present();
  }

  onSave() {
    this.userService
      .updateUser({
        name: this.name,
      })
      .subscribe(
        () => this.dismiss(),
        (err) => {
          // Show an error message
          this.toastCtrl
            .create({
              message: err,
              duration: 2000,
            })
            .then((toast) => toast.present());
        }
      );
  }
}
