import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';

import {
  LoginModule,
  LoginRoutingModule,
  CadastroPjModule,
  CadastroPjRoutingModule,
  CadastroPfModule,
  CadastroPfRoutingModule
} from './autenticacao';
import { AppRoutingModule } from './app-routing.module';
import {
  FuncionarioModule,
  FuncionarioRoutingModule
} from './funcionario';
import {
  AdminModule,
  AdminRoutingModule
} from './admin';

import { 
  HomeModule,
  HomeRoutingModule
} from './home';

import { 
  AvaliacaoModule,
  AvaliacaoRoutingModule
} from './avaliacao';

@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    LoginModule,
    LoginRoutingModule,
    CadastroPjModule,
    CadastroPjRoutingModule,
    CadastroPfModule,
    CadastroPfRoutingModule,
    FuncionarioModule,
    FuncionarioRoutingModule,
    AdminModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    HomeModule,
    HomeRoutingModule,
    AvaliacaoModule,
    AvaliacaoRoutingModule,
    MatStepperModule,

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
