import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

export class LancamentosFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  URL = 'http://localhost:8080/lancamentos';

  constructor(
    private http: HttpClient
  ) { }

  pesquisar(filtro: LancamentosFiltro): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if(filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }

    if(filtro.dataVencimentoInicio) {
      params = params.append('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if(filtro.dataVencimentoFim) {
      params = params.append('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.URL}?resumo`, { headers, params }).toPromise();
  }

  excluir(codigo: number): Promise<any> {
    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.URL}/${codigo}`, {headers}).toPromise();
  }
}
