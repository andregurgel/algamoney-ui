import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../core/model';
import { PessoasService } from '../pessoas.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {

  constructor(
    private pessoasService: PessoasService,
    private messageService: MessageService,
    private error: ErrorHandlerService,
    private activatedRoute: ActivatedRoute
  ) { }

  pessoa = new Pessoa();

  ngOnInit(): void {
    const codigoPessoa = this.activatedRoute.snapshot.params['codigo'];

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  salvar(form: any){
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  async adicionarPessoa(form: any) {
    try {
      await this.pessoasService.salvar(this.pessoa);
      this.successMessage('Pessoa cadastrada com sucesso!');
      form.reset();

      this.pessoa = new Pessoa();
    } catch (e) {
      this.error.handle(e);
    }
  }

  async atualizarPessoa(form: any): Promise<any> {
    try {
      console.log(this.pessoa);
      await this.pessoasService.atualizar(this.pessoa);
      this.successMessage('Pessoa alterada com sucesso!');
    } catch (e) {
      this.error.handle(e);
    }
  }

  async carregarPessoa(codigo: number) {
    try {
      const response = await this.pessoasService.buscarPeloCodigo(codigo);
      this.pessoa = response;
    } catch (e) {
      this.error.handle(e);
    }
  }

  successMessage(mensagem: string){
    this.messageService.add({severity: 'success', summary: mensagem});
  }

}
