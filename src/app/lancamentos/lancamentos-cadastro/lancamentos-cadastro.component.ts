import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tipoDeLancamento = [
    { label: "Receita", value: "RECEITA" },
    { label: "Despesa", value: "DESPESA"}
  ];

  categorias = [
    { label: "Alimentação", value: 1 },
    { label: "Farmacia", value: 2 },
    { label: "Transporte", value: 2 }
  ]

  pessoas = [
    { label: "André Gurgel", value: 1 },
    { label: "Gustavo Miranda", value: 2 },
    { label: "José da Silva", value: 2 }
  ]

}
