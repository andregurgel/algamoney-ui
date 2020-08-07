import { Component} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {
  lancamentos = [
    { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: moment('2017-6-30'), dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José' },
    { tipo: 'DESPESA', descricao: 'Jogos', dataVencimento: moment('2017-6-30'), dataPagamento: moment('2017-7-30'), valor: 99.90, pessoa: 'Nuuvem' },
    { tipo: 'RECEITA', descricao: 'Salario', dataVencimento: moment('2017-7-03'), dataPagamento: null, valor: 500, pessoa: 'Coca-Cola' },
    { tipo: 'RECEITA', descricao: 'Mesada', dataVencimento: moment('2017-6-30'), dataPagamento: null, valor: 150, pessoa: 'Governo' },
    { tipo: 'DESPESA', descricao: 'Bola de Futebol', dataVencimento: moment('2017-6-30'), dataPagamento: moment('2017-7-30'), valor: 25.90, pessoa: 'Mercadinho' },
    { tipo: 'RECEITA', descricao: 'Trade', dataVencimento: moment('2017-7-03'), dataPagamento: null, valor: 30.59, pessoa: 'Clear' }
  ];
}
