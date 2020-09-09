import { Component, OnInit } from '@angular/core';
import { LancamentosFiltro, LancamentosService } from '../lancamentos.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentosFiltro();

  lancamentos = [];

  constructor(
    private lancamentosService: LancamentosService
  ) { }

  ngOnInit() {
  }

  async pesquisar(pagina= 0) {
    this.filtro.pagina = pagina;

    const response = await this.lancamentosService.pesquisar(this.filtro);
    this.totalRegistros = response.totalElements;
    this.lancamentos = response.content;
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }
}
