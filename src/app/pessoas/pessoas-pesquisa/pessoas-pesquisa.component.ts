import { Component, OnInit } from '@angular/core';
import {PessoasFiltro, PessoasService} from "../pessoas.service";
import {LazyLoadEvent} from "primeng/api";

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoasFiltro();

  pessoas = [];

  constructor(
    private pessoasService: PessoasService
  ) { }

  ngOnInit(): void {
  }

  async pesquisar(pagina = 0){
    this.filtro.pagina = pagina;

    const response = await this.pessoasService.pesquisar(this.filtro);
    this.totalRegistros = response.totalElements;
    this.pessoas = response.content;
  }

  async listarTodos() {
    const response = await this.pessoasService.listarTodos();
  }

  aoMudarPAgina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}
