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
  private _authState = new BehaviorSubject(false);
  private url = environment.url;
  private user: User;

  constructor(
    private helper: JwtHelperService,
    private http: HttpClient,
    private storage: Storage
  ) {
    this.checkToken();
  }

  get authState(): BehaviorSubject<boolean> {
    return this._authState;
  }

  checkToken() {
    this.storage.get(ACCESS_TOKEN).then(token => {
      if (token) {
        let isExpired = this.helper.isTokenExpired(token);
        const decoded = this.helper.decodeToken(token);

        if (!isExpired) {
          this.user = decoded;
          this._authState.next(true);
        } else {
          this.storage.remove(ACCESS_TOKEN);
        }
      }
    });
  }

  register(credentials: LoginCredentials): Observable<any> {
    return this.http.post(`${this.url}/api/register`, credentials).pipe(
      catchError(e => {
        console.log(e);
        throw new Error(e);
      })
    );
  }

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post(`${this.url}/api/login`, credentials).pipe(
      tap(res => {
        this.storage.set(ACCESS_TOKEN, res['token']);
        this.user = this.helper.decodeToken(res['token']);
        this._authState.next(true);
      }),
      catchError(e => {
        console.log(e);
        throw new Error(e);
      })
    );
  }

  logout() {
    this.storage.remove(ACCESS_TOKEN).then(() => {
      this._authState.next(false);
    });
  }

  isAuthenticated() {
    return this._authState.value;
  }
}
