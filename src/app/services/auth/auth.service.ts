import { UserService } from './../user/user.service';
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

  constructor(
    private helper: JwtHelperService,
    private http: HttpClient,
    private storage: Storage
  ) {}

  checkToken(): Promise<void> {
    return this.storage.get(ACCESS_TOKEN).then(token => {
      if (token) {
        if (!this.helper.isTokenExpired(token)) {
          this.authState.next(true);
        } else {
          this.storage.remove(ACCESS_TOKEN);
        }
      }
    });
  }

  async getDecodedToken(): Promise<User> {
    const token = await this.storage.get(ACCESS_TOKEN);
    return this.helper.decodeToken(token);
  }

  isAuthenticated() {
    return this.authState.value;
  }

  register(name: string, credentials: LoginCredentials): Observable<any> {
    return this.http
      .post(`${this.url}/api/register`, {
        name,
        ...credentials
      })
      .pipe(
        catchError(e => {
          throw new Error(e.error.msg);
        })
      );
  }

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post(`${this.url}/api/login`, credentials).pipe(
      tap(res => {
        this.storage.set(ACCESS_TOKEN, res['token']);
        this.authState.next(true);
      }),
      catchError(e => {
        throw new Error(e.error.msg);
      })
    );
  }

  async logout(): Promise<void> {
    await this.storage.remove(ACCESS_TOKEN);
    this.authState.next(false);
  }

  changePassword(oldPwd: string, newPwd: string, email: string) {
    return this.http
      .put(`http://localhost:4000/api/password_reset`, {
        email,
        old_password: oldPwd,
        password: newPwd
      })
      .pipe(
        catchError(e => {
          throw new Error(e.error.msg);
        })
      );
  }

  async closeAccount(pwd: string): Promise<void> {
    const user = await this.getDecodedToken();

    this.http
      .post(`${this.url}/api/login`, {
        email: user.email,
        password: pwd
      })
      .toPromise()
      .then(res => {
        return user._id === this.helper.decodeToken(res['token'])._id;
      })
      .then(isValid => {
        if (isValid) {
          this.http
            .delete(`${this.url}/api/users/${user._id}`)
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
