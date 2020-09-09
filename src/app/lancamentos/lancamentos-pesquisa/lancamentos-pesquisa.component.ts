import {Component, OnInit} from '@angular/core';
import { LancamentosFiltro, LancamentosService } from '../lancamentos.service';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  constructor(
    private lancamentosService: LancamentosService,
    private messageService: MessageService,
    private dialog: ConfirmationService
  ) { }

  totalRegistros = 0;
  filtro = new LancamentosFiltro();

  lancamentos = [];

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

  async excluir(lancamento: any, tabela: any) {
    await this.dialog.confirm({
      message: 'Tem certeza que deseja excluir este lançamento?',
      accept: async () => {
        try {
          await this.lancamentosService.excluir(lancamento.codigo);
          this.successMessage('Lançamento excluido com sucesso!');
          await this.pesquisar(tabela._first / tabela._rows);
        } catch (e) {
          this.errorMessage(e);
        }
      }
    });
  }

  successMessage(mensagem: string){
    this.messageService.add({severity: 'success', summary: mensagem});
  }

  errorMessage(mensagem: string){
    this.messageService.add({severity: 'error', summary: mensagem});
  }
}
