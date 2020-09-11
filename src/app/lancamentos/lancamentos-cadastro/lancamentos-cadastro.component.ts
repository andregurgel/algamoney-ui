import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../categorias/categorias.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PessoasService } from '../../pessoas/pessoas.service';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  constructor(
    private categoriasService: CategoriasService,
    private pessoasService: PessoasService,
    private error: ErrorHandlerService
  ) { }

  tipoDeLancamento = [
    { label: "Receita", value: "RECEITA" },
    { label: "Despesa", value: "DESPESA"}
  ];

  categorias = [];

  pessoas = [];

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

}
