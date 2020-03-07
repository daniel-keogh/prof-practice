import { tap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { User } from './../../interfaces/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
          throw new Error(e.error.msg);
        })
      );
  }

  getDays(): Observable<any[]> {
    return this.http
      .get<any[]>(`http://localhost:4000/api/days/${this._user._id}`)
      .pipe(
        map(days => {
          return days.map(day => {
            return {
              ...day,
              date: day.date.split('T')[0] // change date to yyyy-mm-dd
            };
          });
        })
      );
  }
}
