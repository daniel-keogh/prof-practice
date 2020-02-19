import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  template: `
    <ion-list lines="none">
      <ion-item button (click)="navigate('/settings')">
        <ion-label>Settings</ion-label>
      </ion-item>
    </ion-list>
  `
})
export class HomePopoverComponent {
  constructor(private popover: PopoverController, private router: Router) {}

  navigate(route: string) {
    this.router.navigate([route]);
    this.popover.dismiss();
  }
}
