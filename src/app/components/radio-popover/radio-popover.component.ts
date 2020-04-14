import { PopoverController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-radio-popover',
  template: `
    <ion-list lines="none">
      <ion-radio-group [value]="value">
        <ion-list-header>
          <ion-label>{{ title }}</ion-label>
        </ion-list-header>

        <div *ngFor="let item of items">
          <ion-item (click)="onItemClicked(item)">
            <ion-label>{{ item | titlecase }}</ion-label>
            <ion-radio slot="start" value="{{ item }}"></ion-radio>
          </ion-item>
        </div>
      </ion-radio-group>
    </ion-list>
  `,
})
export class RadioPopoverComponent {
  constructor(private popover: PopoverController) {}

  onItemClicked(item: string) {
    // Send back the `item` that was selected
    this.popover.dismiss(item);
  }
}
