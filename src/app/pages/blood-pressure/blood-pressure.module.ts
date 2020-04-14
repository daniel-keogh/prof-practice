import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartsModule } from 'ng2-charts';
import { ComponentsModule } from './../../components/components.module';

import { AddBloodPressure } from './../../components/add-bp/add-bp.component';

import { BloodPressurePageRoutingModule } from './blood-pressure-routing.module';

import { BloodPressurePage } from './blood-pressure.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BloodPressurePageRoutingModule,
    ChartsModule,
    ComponentsModule,
  ],
  declarations: [BloodPressurePage],
  entryComponents: [AddBloodPressure],
})
export class BloodPressurePageModule {}
