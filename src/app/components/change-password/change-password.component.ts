import { UserService } from './../../services/user/user.service';
import { AuthService } from './../../services/auth/auth.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;

  constructor(
    private auth: AuthService,
    private modal: ModalController,
    private toastCtrl: ToastController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.form = new FormGroup(
      {
        current: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        newPwd: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required, Validators.minLength(6)]
        }),
        confirm: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required, Validators.minLength(6)]
        })
      },
      this.confirmPasswordValidator
    );
  }

  dismiss() {
    this.modal.dismiss();
  }

  onSubmit() {
    if (this.form.status !== 'INVALID') {
      const { current, newPwd } = this.form.value;
      const { email } = this.userService.user;

      this.auth.changePassword(current, newPwd, email).subscribe(
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

  /* Prevents the user clicking save if newPwd !== confirm
   * Adapted from: https://stackoverflow.com/a/45544111
   */
  confirmPasswordValidator(control: FormGroup) {
    const newPwd = control.get('newPwd');
    const confirm = control.get('confirm');

    if (newPwd && confirm) {
      if (newPwd.value !== confirm.value) {
        return { confirmError: true };
      }
    }
    return null;
  }
}
