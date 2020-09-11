import { Component, OnInit } from '@angular/core';
import {PessoasFiltro, PessoasService} from "../pessoas.service";
import {LazyLoadEvent, MessageService, ConfirmationService} from "primeng/api";
import { ErrorHandlerService } from '../../core/error-handler.service';

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
    private pessoasService: PessoasService,
    private messageService: MessageService,
    private dialog: ConfirmationService,
    private error: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  async pesquisar(pagina = 0){
    this.filtro.pagina = pagina;

    try {
      const response = await this.pessoasService.pesquisar(this.filtro);
      this.totalRegistros = response.totalElements;
      this.pessoas = response.content;
    } catch (e) {
      this.error.handle(e);
    }
  }

  aoMudarPAgina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  async excluir(pessoa: any, tabela: any) {
    await this.dialog.confirm({
      message: 'Tem certeza que deseja excluir esta pessoa?',
      accept: async () => {
        try {
          await this.pessoasService.excluir(pessoa.codigo);
          this.successMessage('Pessoa excluida com sucesso!');
          await this.pesquisar(tabela._first / tabela._rows);
        } catch (e) {
          this.error.handle(e);
        }
      }
    });
  }

   async mudarStatus(pessoa: any, tabela: any){
    try {
      await this.pessoasService.mudarStatus(pessoa.codigo, !pessoa.ativo);
      this.successMessage('Status alterado com sucesso!');
      await this.pesquisar(tabela._first / tabela._rows);
    } catch (e) {
      this.error.handle(e);
    }
  }

  successMessage(mensagem: string){
    this.messageService.add({severity: 'success', summary: mensagem});
  }

}
