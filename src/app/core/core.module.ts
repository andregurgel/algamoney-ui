import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentosService } from '../lancamentos/lancamentos.service';
import { PessoasService } from '../pessoas/pessoas.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../seguranca/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { config } from 'rxjs';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    RouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['http://localhost:4200/login'],
        disallowedRoutes: [''],
      },
    }),
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    LancamentosService,
    PessoasService,
    MessageService,
    ConfirmationService,
    ErrorHandlerService,
    Title,
    AuthService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ]
})
export class CoreModule { }
