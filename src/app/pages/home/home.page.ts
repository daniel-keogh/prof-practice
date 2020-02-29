import { Router } from '@angular/router';
import { PopoverComponent } from '../../components/popover/popover.component';
import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(private popoverCtrl: PopoverController, private router: Router) {}

  presentPopover(event: any) {
    this.popoverCtrl
      .create({
        component: PopoverComponent,
        event,
        translucent: true,
        componentProps: { items: ['Settings'] }
      })
      .then(popover => {
        popover.present();
        return popover.onWillDismiss();
      })
      .then(result => {
        if (result.role === 'Settings') {
          this.router.navigate([`/settings`]);
        }
      });
  }
}
