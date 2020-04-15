import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { TargetsComponent } from './../../components/targets/targets.component';
import { EditProfileComponent } from './../../components/edit-profile/edit-profile.component';

import { ComponentsModule } from './../../components/components.module';

import { ProfilePage } from './profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ProfilePageRoutingModule,
  ],
  declarations: [ProfilePage],
  entryComponents: [EditProfileComponent, TargetsComponent],
})
export class ProfilePageModule {}
