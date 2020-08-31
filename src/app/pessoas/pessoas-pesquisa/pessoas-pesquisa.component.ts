import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  pessoas = [
    { nome: "Andre Gurgel", cidade: "Patos", estado: "Paraiba", status: "Ativo" },
    { nome: "Ana Luisa", cidade: "Patos", estado: "Paraiba", status: "Inativo" },
    { nome: "Gustavo Miranda", cidade: "Dois Vizinhos", estado: "Parana", status: "Inativo" },
    { nome: "Neroci", cidade: "Dois Vizinhos", estado: "Parana", status: "Inativo" },
    { nome: "Gustavo Vizenci", cidade: "Francisco Beltrão", estado: "Parana", status: "Ativo" },
    { nome: "Lara Dayane", cidade: "Caico", estado: "Rio Grande do Norte", status: "Ativo" },
    { nome: "Thamerson", cidade: "Brejo do Cruz", estado: "Paraiba", status: "Ativo" }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
