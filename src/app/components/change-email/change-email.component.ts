import { UserService } from './../../services/user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html'
})
export class ChangeEmailComponent implements OnInit {
  form: FormGroup;

  constructor(
    private modal: ModalController,
    private toastCtrl: ToastController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.email]
      })
    });
  }

  dismiss() {
    this.modal.dismiss();
  }

  onSubmit() {
    const { email } = this.form.value;

    this.userService.updateUserEmail(email).subscribe(
      () => this.dismiss(),
      err => {
        this.toastCtrl
          .create({
            message: err,
            duration: 2000
          })
          .then(toast => toast.present());
      }
    );
  }
}
