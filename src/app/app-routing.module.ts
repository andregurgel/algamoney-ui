import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: 'lancamentos', loadChildren: () => import('./lancamentos/lancamentos.module').then(m => m.LancamentosModule)},
  { path: 'pessoas', loadChildren: () => import('./pessoas/pessoas.module').then(m => m.PessoasModule)},
  { path: 'login', loadChildren: () => import('./seguranca/seguranca.module').then(m => m.SegurancaModule) },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
