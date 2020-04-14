import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from './../../components/components.module';
import { PopoverComponent } from './../../components/popover/popover.component';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { StoriesPageRoutingModule } from './stories-routing.module';

import { StoriesPage } from './stories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoriesPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [StoriesPage],
  providers: [InAppBrowser],
  entryComponents: [PopoverComponent],
})
export class StoriesPageModule {}
