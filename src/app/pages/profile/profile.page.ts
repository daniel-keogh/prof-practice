import { User } from './../../interfaces/user';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private editable = false;
  private user: User;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.user = await this.auth.getDecodedToken();
  }

  onEditClicked() {
    if (this.editable) {
      // TODO save the changes
    }

    this.editable = !this.editable;
  }

  async onLogOutClicked() {
    await this.auth.logout();
    this.router.navigateByUrl('start-page');
  }
}
