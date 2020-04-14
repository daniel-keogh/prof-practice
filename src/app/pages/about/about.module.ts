import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { AboutPageRoutingModule } from './about-routing.module';

import { AboutPage } from './about.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AboutPageRoutingModule],
  declarations: [AboutPage],
  providers: [InAppBrowser],
})
export class AboutPageModule {}
