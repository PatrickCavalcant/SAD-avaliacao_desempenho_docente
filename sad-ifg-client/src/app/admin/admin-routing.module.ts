import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
	AtualizacaoComponent,
	CadastroComponent, 
	ListagemComponent,
	RelatorioComponent,
	AdminComponent
} from './components';

import { AdminGuard } from './services';

export const AdminRoutes: Routes = [
	{
		path: 'admin',
		component: AdminComponent,
		canActivate: [ AdminGuard ],
		children: [
		  {
			path: '', 
			component: ListagemComponent
		  },
		  {
			path: 'cadastro', 
			component: CadastroComponent 
		  },
		  {
			path: 'atualizacao/:lancamentoId', 
			component: AtualizacaoComponent 
		  },
		  {
			path: 'relatorio', 
			component: RelatorioComponent 
		  },
		]
	}
];

@NgModule({
  imports: [
    RouterModule.forChild(AdminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {
}
