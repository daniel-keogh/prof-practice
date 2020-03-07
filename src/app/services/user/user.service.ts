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
        tap(() => {
          this._user.email = newEmail;
        }),
        catchError(e => {
          throw new Error(e.error.msg);
        })
      );
  }

  getDays(numWeeks: number): Observable<any> {
    const today = this.formatDate(new Date());
    const start = this.formatDate(this.subtractDays(new Date(), numWeeks * 7));

    return this.http
      .get<any>(
        `http://localhost:4000/api/days/5e6418ad98024f30c45f87bc?start_at=${start}&end_at=${today}`
      )
      .pipe(
        map(days => {
          return days.map(day => {
            return {
              ...day,
              date: this.formatDate(day.date)
            };
          });
        })
      );
  }

  /* Convert a Date to yyyy-mm-dd */
  private formatDate(date: Date | string): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return date.toISOString().split('T')[0];
  }

  /* Subtract a given number of days from a Date */
  private subtractDays(date: Date, days: number): Date {
    date.setDate(date.getDate() - days);
    return date;
  }
}
