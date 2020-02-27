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
  constructor(private popover: PopoverController, private router: Router) {}

  async presentPopover(event: any) {
    const popover = await this.popover.create({
      component: PopoverComponent,
      event,
      translucent: true,
      componentProps: {
        items: [
          {
            label: 'Settings',
            handler: () => {
              this.router.navigate(['/settings']);
            }
          }
        ]
      }
    });
    return await popover.present();
  }
}
