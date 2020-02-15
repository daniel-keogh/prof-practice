import { SettingsService } from '../../services/storage/settings.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  private theme: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private settings: SettingsService
  ) {}

  async ngOnInit() {
    this.theme =
      (await this.settings.search(this.settings.keys.Theme)) ||
      this.settings.themes.Light;
  }

  async onLogOutClicked() {
    await this.auth.logout();
    this.router.navigateByUrl('start-page');
  }

  onThemeChanged() {
    this.settings.setTheme(this.theme);
  }
}
