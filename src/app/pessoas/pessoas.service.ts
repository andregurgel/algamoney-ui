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

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if(filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get(`${this.URL}`, {params}).toPromise();
  }

  excluir(codigo: number): Promise<any> {
    return this.http.delete(`${this.URL}/${codigo}`).toPromise();
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.URL}/${codigo}/ativo`, ativo, { headers }).toPromise();
  }

  listarTodos(): Promise<any> {
    return this.http.get(this.URL).toPromise();
  }

  salvar(pessoa: Pessoa): Promise<any> {
    return this.http.post(this.URL, pessoa).toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<any> {
    return this.http.put(`${this.URL}/${pessoa.codigo}`, pessoa).toPromise();
  }

  buscarPeloCodigo(codigo: number): Promise<any> {
    return this.http.get(`${this.URL}/${codigo}`).toPromise();
  }
}
