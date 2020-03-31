import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartsModule } from 'ng2-charts';

import { RadioPopoverComponent } from 'src/app/components/radio-popover/radio-popover.component';
import { ComponentsModule } from './../../components/components.module';

import { WaterPageRoutingModule } from './water-routing.module';

import { WaterPage } from './water.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    WaterPageRoutingModule,
    ChartsModule
  ],
  declarations: [WaterPage],
  entryComponents: [RadioPopoverComponent]
})
export class WaterPageModule {}
