import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StepsPageRoutingModule } from './steps-routing.module';

import { StepsPage } from './steps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StepsPageRoutingModule
  ],
  declarations: [StepsPage]
})
export class StepsPageModule {}
