import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartsModule } from 'ng2-charts';

import { WeightPageRoutingModule } from './weight-routing.module';

import { WeightPage } from './weight.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeightPageRoutingModule,
    ChartsModule
  ],
  declarations: [WeightPage]
})
export class WeightPageModule {}
