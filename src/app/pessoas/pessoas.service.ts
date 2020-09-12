import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Pessoa } from '../core/model';

export class PessoasFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  constructor(
    private http: HttpClient
  ) { }

  URL = 'http://localhost:8080/pessoas';

  pesquisar(filtro: PessoasFiltro): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if(filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get(`${this.URL}`, {headers, params}).toPromise();
  }

  excluir(codigo: number): Promise<any> {
    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.URL}/${codigo}`, {headers}).toPromise();
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<any> {
    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.URL}/${codigo}/ativo`, ativo, {headers}).toPromise();
  }

  listarTodos(): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.URL, {headers}).toPromise();
  }

  salvar(pessoa: Pessoa): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post(this.URL, JSON.stringify(pessoa), { headers }).toPromise();
  }
}
