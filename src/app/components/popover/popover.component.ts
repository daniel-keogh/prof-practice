import { PopoverController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <ion-list lines="none" *ngFor="let item of items">
      <ion-item button (click)="onItemClicked(item.handler)">
        <ion-label>{{ item.label }}</ion-label>
      </ion-item>
    </ion-list>
  `
})
export class PopoverComponent implements OnInit {
  private items: any[];

  constructor(
    private navParams: NavParams,
    private popover: PopoverController
  ) {}

  ngOnInit() {
    this.items = this.navParams.get('items');
  }

  onItemClicked(handler: Function) {
    handler();
    this.popover.dismiss();
  }
}
