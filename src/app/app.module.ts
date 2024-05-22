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

import { HttpClientModule } from '@angular/common/http';
import { SensoresComponent } from './sensores/sensores.component';
import { StatusServidorApiComponent } from './status-servidor-api/status-servidor-api.component';
import { LoginRoutingModule } from './login/login-routing.module';
import { RegisterRoutingModule } from './register/register-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { AuthInterceptor } from './services/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserStatusComponent } from './user-status/user-status.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { PhoneMaskDirective } from './register/phone-mask.directive';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BarraPesquisaComponent,
    NaoEncontradoComponent,
    SensoresComponent,
    StatusServidorApiComponent,
    RegisterComponent,
    LoginComponent,
    UserStatusComponent,
    PhoneMaskDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    LoginRoutingModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    CardModule
  ],
  providers: [ 
  {  provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
