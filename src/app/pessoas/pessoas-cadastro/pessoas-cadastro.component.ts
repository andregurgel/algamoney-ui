import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../core/model';
import { PessoasService } from '../pessoas.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {

  constructor(
    private pessoasService: PessoasService,
    private messageService: MessageService,
    private error: ErrorHandlerService
  ) { }

  pessoa = new Pessoa();

  ngOnInit(): void {
  }

  async salvar(form: any) {
    try {
      await this.pessoasService.salvar(this.pessoa);
      this.successMessage('Pessoa cadastrada com sucesso!');
      form.reset();

      this.pessoa = new Pessoa();
    } catch (e) {
      this.error.handle(e);
    }
  }

  successMessage(mensagem: string){
    this.messageService.add({severity: 'success', summary: mensagem});
  }

}
