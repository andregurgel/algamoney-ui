import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import localeBrExtra from '@angular/common/locales/extra/pt';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

registerLocaleData(localeBr, 'pt-BR', localeBrExtra);

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('access_token');
    },
    allowedDomains: [/localhost:8080/],
    disallowedRoutes: [/oauth\/token/]
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LancamentosModule,
    PessoasModule,
    CoreModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      }
    }),
  ],
  // providers: [{
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: AddHeaderInterceptor,
  //   multi: true
  // }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
