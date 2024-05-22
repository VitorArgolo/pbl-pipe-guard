import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { RequisicaoComponent } from './requisicao.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    RequisicaoComponent
  ],
  imports: [
    CommonModule,
    RequisicaoRoutingModule,
    ReactiveFormsModule,
    CardModule
  ]
})
export class RequisicaoModule { }
