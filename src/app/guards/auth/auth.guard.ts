import { AuthService } from './../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): boolean {
    // Should only be `true` if the user is authenticated
    return this.authService.isAuthenticated();
  }
}
