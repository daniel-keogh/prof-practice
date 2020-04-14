import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BloodPressurePage } from './blood-pressure.page';

const routes: Routes = [
  {
    path: '',
    component: BloodPressurePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BloodPressurePageRoutingModule {}
