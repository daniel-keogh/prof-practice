import { LoginCredentials } from './../../interfaces/login-credentials';
import { ToastController } from '@ionic/angular';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  usersName = '';
  loginCreds: LoginCredentials = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private toastCtrl: ToastController) {}

  ngOnInit() {}

  async onRegisterClick() {
    if (this.usersName && this.loginCreds.email && this.loginCreds.password) {
      try {
        await this.auth.register(this.usersName, this.loginCreds).toPromise();
        await this.auth.login(this.loginCreds).toPromise();
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
