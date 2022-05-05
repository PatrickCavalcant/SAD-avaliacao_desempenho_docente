import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';

import { CadastroPj } from '../';

@Injectable()
export class CadastrarPjService {
  
  //http://localhost:8080/api/cadastrar-pj
  private readonly PATH: string = 'cadastrar-pj';

  constructor(private http: HttpClient) { }

  //Metodo post integando com a API
  cadastrar(cadastroPj: CadastroPj): Observable<any> {
  	  return this.http.post(env.baseApiUrl + this.PATH, cadastroPj);
  }

}
