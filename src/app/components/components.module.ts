import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StatsComponent } from './stats/stats.component';
import { RadioPopoverComponent } from 'src/app/components/radio-popover/radio-popover.component';
import { PopoverComponent } from './popover/popover.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChartHeaderbarComponent } from './chart-headerbar/chart-headerbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule
  ],
  declarations: [
    ChangeEmailComponent,
    ChangePasswordComponent,
    ChartHeaderbarComponent,
    PopoverComponent,
    RadioPopoverComponent,
    StatsComponent
  ],
  exports: [
    ChangeEmailComponent,
    ChangePasswordComponent,
    ChartHeaderbarComponent,
    PopoverComponent,
    RadioPopoverComponent,
    StatsComponent
  ]
})
export class ComponentsModule {}
