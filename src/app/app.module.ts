import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BarraPesquisaComponent } from './barra-pesquisa/barra-pesquisa.component';
import { AppRoutingModule } from './app-routing.module';
import { NaoEncontradoComponent } from './nao-encontrado/nao-encontrado.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbSidebarModule, NbSearchModule  } from '@nebular/theme';

import { HttpClientModule } from '@angular/common/http';
import { SensoresComponent } from './sensores/sensores.component';
import { StatusServidorApiComponent } from './status-servidor-api/status-servidor-api.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BarraPesquisaComponent,
    NaoEncontradoComponent,
    SensoresComponent,
    StatusServidorApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbButtonModule,
    NbInputModule,
    NbIconModule,
    NbCardModule,
    NbSidebarModule,
    NbSearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
