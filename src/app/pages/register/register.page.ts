import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  form: FormGroup;

  constructor(private auth: AuthService, private toastCtrl: ToastController) {}

  ngOnInit() {
    this.form = new FormGroup({
      usersName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(6)]
      })
    });
  }

  async onRegisterClick() {
    const { usersName, email, password } = this.form.value;

    if (usersName && email && password) {
      try {
        await this.auth
          .register(usersName, {
            email,
            password
          })
          .toPromise();
        await this.auth
          .login({
            email,
            password
          })
          .toPromise();
      } catch (err) {
        this.toastCtrl
          .create({
            message: err,
            duration: 2000
          })
          .then(toast => toast.present());
      }
    }
  }
}
