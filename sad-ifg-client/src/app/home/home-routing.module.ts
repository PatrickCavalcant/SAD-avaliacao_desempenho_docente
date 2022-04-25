import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
	HomeComponent, 
} from './components';

export const HomeRoutes: Routes = [
	{
		path: 'home',
		component: HomeComponent,
	}
];

@NgModule({
  imports: [
  	RouterModule.forChild(HomeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {
}


