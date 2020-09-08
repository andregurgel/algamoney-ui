import { Component, OnInit } from '@angular/core';
import { LancamentosFiltro, LancamentosService } from '../lancamentos.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;

  lancamentos = [];

  constructor(
    private lancamentosService: LancamentosService
  ) { }

  ngOnInit() {
    this.pesquisar();
  }

  async pesquisar() {
    const filtro: LancamentosFiltro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim
    };

    const response = await this.lancamentosService.pesquisar(filtro);
    this.lancamentos = response.content;
  }
}
