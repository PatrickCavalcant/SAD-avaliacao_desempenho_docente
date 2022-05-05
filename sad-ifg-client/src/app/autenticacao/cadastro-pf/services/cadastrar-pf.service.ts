import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';

import { CadastroPf } from '../';

@Injectable()
export class CadastrarPfService {
  
 //http://localhost:8080/api/cadastrar-pf
  private readonly PATH: string = 'cadastrar-pf';

  constructor(private http: HttpClient) { }

   //Metodo post integando com a API
  cadastrar(cadastroPf: CadastroPf): Observable<any> {
  	  return this.http.post(env.baseApiUrl + this.PATH, cadastroPf);
  }

}
