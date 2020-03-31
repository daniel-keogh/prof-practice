import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StepsPage } from './steps.page';

const routes: Routes = [
  {
    path: '',
    component: StepsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StepsPageRoutingModule {}
