import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { User } from './../../interfaces/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: User;

  constructor(private auth: AuthService, private http: HttpClient) {
    this.initialiseUser();
  }

  get user() {
    return { ...this._user };
  }

  private async initialiseUser() {
    this._user = await this.auth.getDecodedToken();
  }

  updateUserEmail(newEmail: string) {
    return this.http
      .put(`http://localhost:4000/api/users/${this._user._id}`, {
        ...this._user,
        email: newEmail
      })
      .pipe(
        tap(res => {
          this._user.email = newEmail;
        }),
        catchError(e => {
          throw new Error(e.error.errors[0].msg);
        })
      );
  }
}
