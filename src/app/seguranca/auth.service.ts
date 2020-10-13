import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenURL = 'http://localhost:8080/oauth/token';
  token: any;
  jwtPayload: any;

  constructor(private http: HttpClient,
              private jwtHelperService: JwtHelperService)
  {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<void>(`${this.oauthTokenURL}`, body, { headers, withCredentials: true }).toPromise()
      .then(response => {
        this.token = response;
        this.armazenarToken(this.token.access_token);
      })
      .catch(response => {
        if (response.status === 400) {
          if (response.error.error === 'invalid_grant') {
            return Promise.reject('Usuario ou senha inválidos!');
          }
        }
        return Promise.reject(response.error);
      });
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

  getNewAccessToken(): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `grant_type=refresh_token`;

    return this.http.post<void>(`${this.oauthTokenURL}`, body, { headers, withCredentials: true }).toPromise();
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }
}
