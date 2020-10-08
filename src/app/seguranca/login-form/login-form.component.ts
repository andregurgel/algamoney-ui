import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  token: any;
  jwtPayload: any;

  constructor(private authService: AuthService,
              private error: ErrorHandlerService,
              private jwtHelperService: JwtHelperService,
              private router: Router) { }

  ngOnInit(): void {
    this.carregarToken();
  }

  async login(usuario: string, senha: string) {
    try {
      this.token = await this.authService.login(usuario, senha);
      this.armazenarToken(this.token.access_token);
      await this.router.navigate(['/lancamentos']);
    } catch (e) {
      const erro = e.error;
      if (erro.error === 'invalid_grant') {
        this.error.handle('Usuário ou senha inválidos');
      } else {
        this.error.handle(e);
      }
    }
  }

  armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelperService.decodeToken(token);
    localStorage.setItem('access_token', token);
  }

  carregarToken() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.armazenarToken(token);
    }
  }

}
