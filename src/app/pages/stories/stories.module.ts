import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { StoriesPageRoutingModule } from './stories-routing.module';

import { StoriesPage } from './stories.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, StoriesPageRoutingModule],
  declarations: [StoriesPage],
  providers: [InAppBrowser],
})
export class StoriesPageModule {}
