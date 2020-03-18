import { Day } from './../../interfaces/day';
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
  user: User;

  constructor(private http: HttpClient) {}

  updateUserEmail(newEmail: string) {
    return this.http
      .put(`http://localhost:4000/api/users/${this.user._id}`, {
        ...this.user,
        email: newEmail
      })
      .pipe(
        tap(() => {
          this.user.email = newEmail;
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
        `http://localhost:4000/api/days/${this.user._id}?start_at=${start}&end_at=${today}`
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
      .get<any>(`http://localhost:4000/api/days/${this.user._id}`)
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
