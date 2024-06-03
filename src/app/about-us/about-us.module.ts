import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AboutUsComponent,
   
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,  
    FormsModule,
    NgxPaginationModule
  ]
})
export class AboutUsModule { }
