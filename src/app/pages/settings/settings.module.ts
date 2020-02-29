import { ChangeEmailComponent } from './../../components/change-email/change-email.component';
import { ChangePasswordComponent } from './../../components/change-password/change-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SettingsPageRoutingModule
  ],
  declarations: [SettingsPage, ChangeEmailComponent, ChangePasswordComponent],
  entryComponents: [ChangePasswordComponent, ChangeEmailComponent]
})
export class SettingsPageModule {}
