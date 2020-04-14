import { UserService } from './../user/user.service';
import { LoginCredentials } from '../../interfaces/login-credentials';
import { User } from './../../interfaces/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const ACCESS_TOKEN = 'access_token';
const USER_ID = 'user_id';

// Authentication Service
// Implementation based on the below tutorial by Simon Grimm
// https://www.youtube.com/watch?v=c79ZUM9zawc

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authState = new BehaviorSubject(false);

  constructor(
    private helper: JwtHelperService,
    private http: HttpClient,
    private storage: Storage,
    private userService: UserService
  ) {}

  async checkToken(): Promise<void> {
    // Read the token from local storage
    const token = await this.storage.get(ACCESS_TOKEN);

    if (token) {
      if (!this.helper.isTokenExpired(token)) {
        // Token is not expired: Login the user
        this.authState.next(true);
        this.userService.user = await this.getDecodedToken();
      } else {
        // Token is expired: Remove it from storage
        this.storage.remove(ACCESS_TOKEN);
      }
    }
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
      .post(`http://localhost:4000/api/register`, {
        name,
        ...credentials,
      })
      .pipe(
        catchError((e) => {
          throw new Error(e.error.msg);
        })
      );
  }

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post(`http://localhost:4000/api/login`, credentials).pipe(
      tap((res) => {
        // Save the token & user ID to local storage for future use
        this.storage.set(ACCESS_TOKEN, res['token']);
        this.storage.set(USER_ID, res['_id']);

        // Decode the token & save the user's details
        this.userService.user = this.helper.decodeToken(res['token']);

        // Signal that this user is authenticated
        this.authState.next(true);
      }),
      catchError((e) => {
        throw new Error(e.error.msg);
      })
    );
  }

  async logout(): Promise<void> {
    // Clear any stored data
    await this.storage.remove(ACCESS_TOKEN);
    await this.storage.remove(USER_ID);

    // Clear user data from the UserService
    this.userService.user = null;

    // Signal that this user is now unauthenticated
    this.authState.next(false);
  }

  changePassword(oldPwd: string, newPwd: string, email: string) {
    return this.http
      .put(`http://localhost:4000/api/password_reset`, {
        email,
        old_password: oldPwd,
        password: newPwd,
      })
      .pipe(
        catchError((e) => {
          throw new Error(e.error.msg);
        })
      );
  }

  async closeAccount(pwd: string): Promise<void> {
    const user = await this.getDecodedToken();

    return this.http
      .post(`http://localhost:4000/api/login`, {
        email: user.email,
        password: pwd,
      })
      .toPromise()
      .then((res) => {
        // Check the ID from the JWT token
        return user._id === this.helper.decodeToken(res['token'])._id;
      })
      .then((isValid) => {
        if (isValid) {
          return this.http
            .delete(`http://localhost:4000/api/users/${user._id}`)
            .toPromise()
            .then((data) => {
              if (data['ok']) {
                // Account was deleted: Logout
                this.logout();
              }
            })
            .catch((err) => {
              throw err;
            });
        }
      })
      .catch((err) => {
        throw err;
      });
  }
}
