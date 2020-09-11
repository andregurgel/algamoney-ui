import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../categorias/categorias.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PessoasService } from '../../pessoas/pessoas.service';
import { Lancamento } from '../../core/model';
import { LancamentosService } from '../lancamentos.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  constructor(
    private categoriasService: CategoriasService,
    private pessoasService: PessoasService,
    private lancamentosService: LancamentosService,
    private messageService: MessageService,
    private error: ErrorHandlerService
  ) { }

  tipoDeLancamento = [
    { label: "Receita", value: "RECEITA" },
    { label: "Despesa", value: "DESPESA"}
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  ngOnInit(): void {
    this.listarCategorias();
    this.listarPessoas();
  }

  async listarCategorias() {
    try {
      const response = await this.categoriasService.listarTodas();
      this.categorias = response.map(c => {
        return { label: c.nome, value: c.codigo};
      });
    } catch (e) {
      this.error.handle(e);
    }
  }

  async listarPessoas() {
    try {
      const response = await this.pessoasService.listarTodos();
      this.pessoas = response.content.map(p => {
        return { label: p.nome, value: p.codigo };
      });
    } catch (e) {
      this.error.handle(e);
    }
  }

  async salvar(form: any){
    try {
      await this.lancamentosService.salvar(this.lancamento);
      this.successMessage('Lançamento cadastrado com sucesso!');
      form.reset();

      this.lancamento = new Lancamento();
    } catch (e) {
      this.error.handle(e);
    }
  }

  successMessage(mensagem: string){
    this.messageService.add({severity: 'success', summary: mensagem});
  }

}
