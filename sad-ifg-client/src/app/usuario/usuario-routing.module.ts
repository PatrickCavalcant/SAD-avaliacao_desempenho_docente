import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
	UsuarioComponent,
	LancamentoComponent, 
	ListagemComponent 
} from './components';

export const UsuarioRoutes: Routes = [
	{
		path: 'usuario',
		component: UsuarioComponent,
		children: [
		  {
			path: '', 
			component: LancamentoComponent 
		  },
		  {
			path: 'listagem', 
			component: ListagemComponent 
		  }
		]
	}
];

@NgModule({
  imports: [
    RouterModule.forChild(UsuarioRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsuarioRoutingModule {
}



