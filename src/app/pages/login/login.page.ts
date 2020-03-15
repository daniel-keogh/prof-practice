import { ToastController } from '@ionic/angular';
import { LoginCredentials } from './../../interfaces/login-credentials';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginCreds: LoginCredentials = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private toastCtrl: ToastController) {}

  ngOnInit() {}

  onLoginClick() {
    if (this.loginCreds.email && this.loginCreds.password) {
      this.auth
        .login(this.loginCreds)
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
