import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface LancametosFiltro {
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  URL = 'http://localhost:8080/lancamentos';

  constructor(
    private http: HttpClient
  ) { }

  pesquisar(filtro: LancametosFiltro): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    if(filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }

    return this.http.get(`${this.URL}?resumo`, { headers, params }).toPromise();
  }
}
