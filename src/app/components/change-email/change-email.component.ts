import { map, take } from 'rxjs/operators';
import { UserService } from './../../services/user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html'
})
export class ChangeEmailComponent implements OnInit {
  form: FormGroup;
  currentEmail: string;

  constructor(
    private modal: ModalController,
    private toastCtrl: ToastController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.currentEmail = this.userService.user.email;
    this.userService
      .getUsersFullInfo()
      .pipe(
        map(user => user.email),
        take(1)
      )
      .subscribe(email => {
        if (email !== this.currentEmail) {
          this.currentEmail = email;
        }
      });

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
