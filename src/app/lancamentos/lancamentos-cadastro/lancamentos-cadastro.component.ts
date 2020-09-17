import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../categorias/categorias.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PessoasService } from '../../pessoas/pessoas.service';
import { Lancamento } from '../../core/model';
import { LancamentosService } from '../lancamentos.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  constructor(
    private categoriasService: CategoriasService,
    private pessoasService: PessoasService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private lancamentosService: LancamentosService,
    private messageService: MessageService,
    private error: ErrorHandlerService,
    private title: Title
  ) { }

  tipoDeLancamento = [
    { label: "Receita", value: "RECEITA" },
    { label: "Despesa", value: "DESPESA"}
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  ngOnInit(): void {
    const codigoLancamento = this.activatedRoute.snapshot.params['codigo'];

    this.title.setTitle('Novo lançamento');

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.listarCategorias();
    this.listarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
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

  salvar(form: any){
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  async adicionarLancamento(form: any) {
    try {
      const response = await this.lancamentosService.salvar(this.lancamento);
      this.successMessage('Lançamento cadastrado com sucesso!');

      const lancamentoAdicionado = response;
      this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
    } catch (e) {
      this.error.handle(e);
    }
  }

  async atualizarLancamento(form: any) {
    try {
      await this.lancamentosService.atualizar(this.lancamento)
        .then(lancamento => {
          this.lancamento = lancamento;
          this.atualizaTitulo();
        });
      this.successMessage('Lançamento alterado com sucesso!');
    } catch (e) {
      this.error.handle(e);
    }
  }

  carregarLancamento(codigo: number) {
    this.lancamentosService.buscarPeloCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.atualizaTitulo();
      })
      .catch(erro => this.error.handle(erro));
  }

  novo(form: any) {
    form.reset();
    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizaTitulo() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

  successMessage(mensagem: string){
    this.messageService.add({severity: 'success', summary: mensagem});
  }

}
