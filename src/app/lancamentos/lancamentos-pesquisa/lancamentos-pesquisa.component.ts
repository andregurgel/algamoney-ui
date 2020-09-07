import { Component, OnInit } from '@angular/core';
import { LancamentosService } from '../lancamentos.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  descricao: string;
  lancamentos = [];

  constructor(
    private lancamentosService: LancamentosService
  ) { }

  ngOnInit() {
    this.pesquisar();
  }

  async pesquisar() {
    const response = await this.lancamentosService.pesquisar({descricao: this.descricao});
    this.lancamentos = response.content;
  }
}
