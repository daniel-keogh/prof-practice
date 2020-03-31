import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { ChangePasswordComponent } from './../../components/change-password/change-password.component';
import { ChangeEmailComponent } from './../../components/change-email/change-email.component';
import { ComponentsModule } from '../../components/components.module';

import { SettingsPage } from './settings.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule
  ],
  declarations: [SettingsPage],
  entryComponents: [ChangeEmailComponent, ChangePasswordComponent]
})
export class SettingsPageModule {}
