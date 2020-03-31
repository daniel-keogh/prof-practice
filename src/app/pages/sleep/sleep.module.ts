import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartsModule } from 'ng2-charts';

import { RadioPopoverComponent } from 'src/app/components/radio-popover/radio-popover.component';
import { ComponentsModule } from './../../components/components.module';

import { SleepPageRoutingModule } from './sleep-routing.module';

import { SleepPage } from './sleep.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    SleepPageRoutingModule,
    ChartsModule
  ],
  declarations: [SleepPage],
  entryComponents: [RadioPopoverComponent]
})
export class SleepPageModule {}
