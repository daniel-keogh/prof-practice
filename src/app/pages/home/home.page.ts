import { HomePopoverComponent } from './../../components/home-popover/home-popover.component';
import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(private popover: PopoverController) {}

  async presentPopover(event: any) {
    const popover = await this.popover.create({
      component: HomePopoverComponent,
      event,
      translucent: true
    });
    return await popover.present();
  }
}
