import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  template: `
    <ion-list lines="none">
      <ion-list-header lines="inset" *ngIf="title">
        <ion-label>{{ title }}</ion-label>
      </ion-list-header>
      <ion-item button (click)="onItemClicked(item)" *ngFor="let item of items">
        <ion-label>{{ item }}</ion-label>
      </ion-item>
    </ion-list>
  `,
})
export class PopoverComponent {
  constructor(private popover: PopoverController) {}

  onItemClicked(item: string) {
    // Send back the `item` that was clicked
    this.popover.dismiss(item);
  }
}
