import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErdekesCikkPage } from './erdekes-cikk.page';

const routes: Routes = [
  {
    path: '',
    component: ErdekesCikkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErdekesCikkPageRoutingModule {}
