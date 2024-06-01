import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringListComponent } from './monitoring-list.component';

const routes: Routes = [{ path: '', component: MonitoringListComponent }];
 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringListRoutingModule { }
