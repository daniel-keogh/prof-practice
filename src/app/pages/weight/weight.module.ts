import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartsModule } from 'ng2-charts';

import { RadioPopoverComponent } from 'src/app/components/radio-popover/radio-popover.component';
import { ComponentsModule } from './../../components/components.module';

import { WeightPageRoutingModule } from './weight-routing.module';

import { WeightPage } from './weight.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    WeightPageRoutingModule,
    ChartsModule
  ],
  declarations: [WeightPage],
  entryComponents: [RadioPopoverComponent]
})
export class WeightPageModule {}
