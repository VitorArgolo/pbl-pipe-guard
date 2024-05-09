import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentsRoutingModule } from './incidents-routing.module';
import { IncidentsComponent } from './incidents.component';
import { FormsModule } from '@angular/forms';
import { DetalhesIncidentComponent } from './detalhes-incident/detalhes-incident.component';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbCardModule, NbInputModule, NbIconModule } from '@nebular/theme';

@NgModule({
  declarations: [
    IncidentsComponent,
    DetalhesIncidentComponent
   
  ],
  imports: [
    CommonModule,
    IncidentsRoutingModule,  
    FormsModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbButtonModule,
    NbInputModule,
    NbIconModule,
    NbCardModule
  ]
})
export class IncidentsModule { }
