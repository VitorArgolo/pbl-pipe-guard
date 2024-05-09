import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SensoresComponent } from './sensores.component';

const routes: Routes = [{ path: '', component: SensoresComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SensoresRoutingModule { }
