import { TargetsService } from './../../services/targets/targets.service';
import { ModalController, ToastController } from '@ionic/angular';
import { User } from './../../interfaces/user';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { EditProfileComponent } from 'src/app/components/edit-profile/edit-profile.component';
import { TargetsComponent } from './../../components/targets/targets.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private modalCtrl: ModalController,
    private targets: TargetsService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.user = this.userService.user;
  }

  openEditModal() {
    this.modalCtrl
      .create({
        component: EditProfileComponent,
      })
      .then((modal) => {
        modal.present();

        modal.onDidDismiss().then(() => {
          this.user = this.userService.user;
        });
      });
  }

  openSetTargetModal() {
    this.modalCtrl
      .create({
        component: TargetsComponent,
      })
      .then((modal) => {
        modal.present();

        modal
          .onDidDismiss()
          .then((result) => {
            if (result.data) {
              this.targets.setTarget(result.data);
            }
          })
          .catch((err) => {
            // Show an error message
            this.toastCtrl
              .create({
                message: err,
                duration: 2000,
              })
              .then((toast) => toast.present());
          });
      });
  }
}
