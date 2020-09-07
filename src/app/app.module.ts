import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import {registerLocaleData} from "@angular/common";
import localeBr from "@angular/common/locales/pt";
import localeBrExtra from "@angular/common/locales/extra/pt";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LancamentosModule} from "./lancamentos/lancamentos.module";
import {PessoasModule} from "./pessoas/pessoas.module";
import {CoreModule} from "./core/core.module";
import { HttpClientModule } from '@angular/common/http';
import { LancamentosService } from './lancamentos/lancamentos.service';
import { PessoasService } from './pessoas/pessoas.service';

registerLocaleData(localeBr, 'pt', localeBrExtra);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LancamentosModule,
    PessoasModule,
    CoreModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    LancamentosService,
    PessoasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
