import { Day } from './../../interfaces/day';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from './../../interfaces/user';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  get userId() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user._id;
        } else {
          return null;
        }
      })
    );
  }

  get user() {
    if (this._user) {
      return this._user.value;
    } else {
      return null;
    }
  }

  set user(user: User) {
    this._user.next(user);
  }

  getUsersFullInfo(): Observable<User> {
    return this.http
      .get<User>(`http://localhost:4000/api/users/${this._user.value._id}`)
      .pipe(
        tap(data => {
          const { _id, name, email, registered_since } = data;

          this._user.next({
            _id,
            name,
            email,
            registered_since
          });
        })
      );
  }

  updateUserEmail(newEmail: string) {
    return this.http
      .put(`http://localhost:4000/api/users/${this._user.value._id}`, {
        ...this._user.value,
        email: newEmail
      })
      .pipe(
        tap(() => {
          this._user.next({
            ...this._user.value,
            email: newEmail
          });
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
        `http://localhost:4000/api/days/${this._user.value._id}?start_at=${start}&end_at=${today}`
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

  updateDay(day: Day): Promise<any> {
    return this.http
      .get<any>(`http://localhost:4000/api/days/${this._user.value._id}`)
      .toPromise()
      .then((data: Day[]) => {
        const today = data.find(day => {
          return this.formatDate(day.date) === this.formatDate(new Date());
        });

        if (today) {
          return this.http
            .put<any>(`http://localhost:4000/api/days/${today._id}`, {
              ...today,
              ...day
            })
            .toPromise();
        } else {
          return this.http
            .post<any>(`http://localhost:4000/api/days/`, {
              ...day
            })
            .toPromise();
        }
      })
      .catch(err => {
        throw new Error(err.error.msg);
      });
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
