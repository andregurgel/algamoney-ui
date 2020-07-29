import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'algamoney-ui';
  lancamentos = [
    { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: '30/06/2017', dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José' },
    { tipo: 'DESPESA', descricao: 'Minecraft', dataVencimento: '30/06/2017', dataPagamento: '30/07/2017', valor: 99.90, pessoa: 'Nuuvem' },
    { tipo: 'RECEITA', descricao: 'Salario', dataVencimento: '03/07/2017', dataPagamento: null, valor: 500, pessoa: 'Tigitale' }
  ];
}
