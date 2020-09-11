import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../categorias/categorias.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  constructor(
    private categoriasService: CategoriasService,
    private error: ErrorHandlerService
  ) { }

  tipoDeLancamento = [
    { label: "Receita", value: "RECEITA" },
    { label: "Despesa", value: "DESPESA"}
  ];

  categorias = [];

  pessoas = [
    { label: "André Gurgel", value: 1 },
    { label: "Gustavo Miranda", value: 2 },
    { label: "José da Silva", value: 2 }
  ];

  ngOnInit(): void {
    this.listarCategorias();
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

}
