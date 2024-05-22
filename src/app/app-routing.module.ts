import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NaoEncontradoComponent } from './nao-encontrado/nao-encontrado.component';
import { DetalhesIncidentComponent } from './incidents/detalhes-incident/detalhes-incident.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'incidents', canActivate: [AuthGuard], loadChildren: () => import('./incidents/incidents.module').then(m => m.IncidentsModule) },
  { path: "", redirectTo: "incidents", pathMatch: "full" },
  { path: 'progresso', canActivate: [AuthGuard], loadChildren: () => import('./progresso/progresso.module').then(m => m.ProgressoModule) },
  { path: 'requisicao', loadChildren: () => import('./requisicao/requisicao.module').then(m => m.RequisicaoModule) },
  { path: 'geofones', canActivate: [AuthGuard], loadChildren: () => import('./sensores/sensores.module').then(m => m.SensoresModule) },
  { path: 'status', canActivate: [AuthGuard], loadChildren: () => import('./status-servidor-api/status-servidor-api.module').then(m => m.StatusServidorApiModule) },
  { path: "**", component: NaoEncontradoComponent }];

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