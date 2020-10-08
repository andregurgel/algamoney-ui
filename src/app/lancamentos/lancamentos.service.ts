import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';
import { Lancamento } from '../core/model';

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

    return this.http.get(`${this.URL}?resumo`, { params }).toPromise();
  }

  excluir(codigo: number): Promise<any> {
    return this.http.delete(`${this.URL}/${codigo}`).toPromise();
  }

  salvar(lancamento: Lancamento): Promise<any> {
    return this.http.post(this.URL, JSON.stringify(lancamento)).toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<any> {
    return this.http.put(`${this.URL}/${lancamento.codigo}`, JSON.stringify(lancamento)).toPromise();
  }

  buscarPeloCodigo(codigo: number): Promise<any> {
    return this.http.get(`${this.URL}/${codigo}`).toPromise()
      .then(response => {
        const lancamento = response as Lancamento;

        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });

  }

  converterStringsParaDatas(lancamentos: Lancamento[]){
    for(const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if(lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }
}
