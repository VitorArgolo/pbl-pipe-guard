import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhesIncidentComponent } from './detalhes-incident/detalhes-incident.component';

import { IncidentsComponent } from './incidents.component';

const routes: Routes = [
  { path: ':id', component: DetalhesIncidentComponent},
  { path: '', component: IncidentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class IncidentsRoutingModule { }