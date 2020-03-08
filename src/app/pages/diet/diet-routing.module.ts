import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DietPage } from './diet.page';

const routes: Routes = [
  {
    path: '',
    component: DietPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietPageRoutingModule {}
