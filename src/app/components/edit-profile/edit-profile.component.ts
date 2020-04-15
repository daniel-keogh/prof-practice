import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  name: string;

  constructor(
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

  onSubmit() {
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
