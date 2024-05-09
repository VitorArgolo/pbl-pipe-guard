import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgressoComponent } from './progresso.component';

const routes: Routes = [{ path: '', component: ProgressoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgressoRoutingModule { }
