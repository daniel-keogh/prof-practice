import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  template: `
    <ion-list lines="none" *ngFor="let item of items">
      <ion-item button (click)="onItemClicked(item)">
        <ion-label>{{ item }}</ion-label>
      </ion-item>
    </ion-list>
  `
})
export class PopoverComponent {
  @Input() items: string[];

  constructor(private popover: PopoverController) {}

  onItemClicked(item: string) {
    this.popover.dismiss(null, item);
  }
}
