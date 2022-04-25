import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { HomeComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    MatListModule,
    MatCardModule
  ],
  declarations: [
    HomeComponent
    
  ]

})
export class HomeModule { }
