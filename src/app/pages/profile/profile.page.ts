import { ModalController } from '@ionic/angular';
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
    private modalCtrl: ModalController
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
      });
  }

  openSetTargetModal() {
    this.modalCtrl
      .create({
        component: TargetsComponent,
      })
      .then((modal) => {
        modal.present();
      });
  }
}
