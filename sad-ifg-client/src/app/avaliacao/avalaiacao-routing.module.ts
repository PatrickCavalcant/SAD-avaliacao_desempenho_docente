import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
	AvaliacaoComponent, 
	AvaliarComponent,
	ListagemComponent 
} from './components';

export const AvaliacaoRoutes: Routes = [
	
	{
		path: 'avaliacao',
		component: AvaliacaoComponent,
		children: [
			{
			  path: '', 
			  component: AvaliarComponent 
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
  	RouterModule.forChild(AvaliacaoRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AvaliacaoRoutingModule {
}


