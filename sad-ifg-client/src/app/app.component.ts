import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpUtilService } from './shared';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  home=true;
  avaliacao=true;
  admin=false;
  criaQuestionario=false;
  empresa=false;
  usuario=false;
  relatorio=false;
  upload=false;

  constructor(
    private router: Router,
    private httpUtilService: HttpUtilService,
    ) { }

  ngOnInit() {
    this.obterPerfilUsuario();
  }

  sair() {
  	delete localStorage['token'];
  	this.router.navigate(['/']);
  }

  autenticado(): boolean {
    return localStorage['token'];
  }

  obterPerfilUsuario() {
    if (this.httpUtilService.obterPerfil() === 'ROLE_ADMIN') {
      this.admin=true;
      this.criaQuestionario=true;
      this.empresa=true;
      this.usuario=true;
      this.relatorio=true;
      this.upload=true;
    }

  }


}
