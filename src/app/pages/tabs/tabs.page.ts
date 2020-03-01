import { Router } from '@angular/router';
import { PopoverComponent } from './../../components/popover/popover.component';
import { Component, ViewChild } from '@angular/core';
import { IonTabs, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss']
})
export class TabsPage {
  title: string;
  @ViewChild('tabs', { static: false }) tabRef: IonTabs;

  constructor(private popoverCtrl: PopoverController, private router: Router) {}

  ionTabsWillChange() {
    this.title = this.tabRef.getSelected();
  }

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
