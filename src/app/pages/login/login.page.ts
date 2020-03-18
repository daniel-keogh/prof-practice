import { ToastController } from '@ionic/angular';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(private auth: AuthService, private toastCtrl: ToastController) {}

  ngOnInit() {
    this.form = new FormGroup({
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

  onLoginClick() {
    const { email, password } = this.form.value;

    if (email && password) {
      this.auth
        .login({
          email,
          password
        })
        .toPromise()
        .catch(err => {
          this.toastCtrl
            .create({
              message: err,
              duration: 2000
            })
            .then(toast => toast.present());
        });
    }
  }
}
