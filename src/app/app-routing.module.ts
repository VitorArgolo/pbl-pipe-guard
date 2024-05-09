import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NaoEncontradoComponent } from './nao-encontrado/nao-encontrado.component';
import { DetalhesIncidentComponent } from './incidents/detalhes-incident/detalhes-incident.component';


const routes: Routes = [
  { path: 'incidents', loadChildren: () => import('./incidents/incidents.module').then(m => m.IncidentsModule) },
  { path: "", redirectTo: "incidents", pathMatch: "full"},
  { path: 'progresso', loadChildren: () => import('./progresso/progresso.module').then(m => m.ProgressoModule) },
  { path: 'requisicao', loadChildren: () => import('./requisicao/requisicao.module').then(m => m.RequisicaoModule) },
  { path: 'geofones', loadChildren: () => import('./sensores/sensores.module').then(m => m.SensoresModule) },
  { path: 'status', loadChildren: () => import('./status-servidor-api/status-servidor-api.module').then(m => m.StatusServidorApiModule) },
  { path: "**", component: NaoEncontradoComponent}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }