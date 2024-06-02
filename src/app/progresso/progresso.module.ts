import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressoRoutingModule } from './progresso-routing.module';
import { ProgressoComponent } from './progresso.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ProgressoComponent
  ],
  imports: [
    CommonModule,
    ProgressoRoutingModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ProgressoModule { }
