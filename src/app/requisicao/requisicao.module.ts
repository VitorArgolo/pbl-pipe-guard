import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { RequisicaoComponent } from './requisicao.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbCardModule, NbInputModule, NbIconModule } from '@nebular/theme';


@NgModule({
  declarations: [
    RequisicaoComponent
  ],
  imports: [
    CommonModule,
    RequisicaoRoutingModule,
    ReactiveFormsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbButtonModule,
    NbInputModule,
    NbIconModule,
    NbCardModule
  ]
})
export class RequisicaoModule { }
