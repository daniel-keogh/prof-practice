import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartsModule } from 'ng2-charts';

import { WaterPageRoutingModule } from './water-routing.module';

import { WaterPage } from './water.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaterPageRoutingModule,
    ChartsModule
  ],
  declarations: [WaterPage]
})
export class WaterPageModule {}
