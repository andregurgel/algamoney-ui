import { Component} from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {
  lancamentos = [
    { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: '30/06/2017', dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José' },
    { tipo: 'DESPESA', descricao: 'Jogos', dataVencimento: '30/06/2017', dataPagamento: '30/07/2017', valor: 99.90, pessoa: 'Nuuvem' },
    { tipo: 'RECEITA', descricao: 'Salario', dataVencimento: '03/07/2017', dataPagamento: null, valor: 500, pessoa: 'Coca-Cola' },
    { tipo: 'RECEITA', descricao: 'Mesada', dataVencimento: '30/06/2017', dataPagamento: null, valor: 150, pessoa: 'Governo' },
    { tipo: 'DESPESA', descricao: 'Bola de Futebol', dataVencimento: '30/06/2017', dataPagamento: '30/07/2017', valor: 25.90, pessoa: 'Mercadinho' },
    { tipo: 'RECEITA', descricao: 'Trade', dataVencimento: '03/07/2017', dataPagamento: null, valor: 30.59, pessoa: 'Clear' }
  ];
}
