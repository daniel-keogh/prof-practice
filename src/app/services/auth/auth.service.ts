import { LoginCredentials } from '../../interfaces/login-credentials';
import { User } from './../../interfaces/user';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const ACCESS_TOKEN = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authState = new BehaviorSubject(false);
  private url = environment.url;
  private user: User;

  constructor(
    private helper: JwtHelperService,
    private http: HttpClient,
    private storage: Storage
  ) { }

  checkToken(): Promise<void> {
    return this.storage.get(ACCESS_TOKEN).then(token => {
      if (token) {
        let isExpired = this.helper.isTokenExpired(token);
        const decoded = this.helper.decodeToken(token);

        if (!isExpired) {
          this.user = decoded;
          this.authState.next(true);
        } else {
          this.storage.remove(ACCESS_TOKEN);
        }
      }
    });
  }

  register(name: string, credentials: LoginCredentials): Observable<any> {
    return this.http
      .post(`${this.url}/api/register`, {
        name,
        ...credentials
      })
      .pipe(
        catchError(e => {
          throw new Error(e);
        })
      );
  }

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post(`${this.url}/api/login`, credentials).pipe(
      tap(res => {
        this.storage.set(ACCESS_TOKEN, res['token']);
        this.user = this.helper.decodeToken(res['token']);
        this.authState.next(true);
      }),
      catchError(e => {
        console.log(e);
        throw new Error(e);
      })
    );
  }

  logout(): Promise<void> {
    return this.storage.remove(ACCESS_TOKEN).then(() => {
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }

  closeAccount(pwd: string) {
    this.http.post(`${this.url}/api/login`, {
      email: this.user.email,
      password: pwd
    }).toPromise()
      .then(res => {
        return this.user._id === this.helper.decodeToken(res['token'])._id;
      })
      .then(isValid => {
        if (isValid) {
          this.http.delete(`${this.url}/api/users/${this.user._id}`)
            .toPromise()
            .then(() => {
              this.logout();
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
  }
}
