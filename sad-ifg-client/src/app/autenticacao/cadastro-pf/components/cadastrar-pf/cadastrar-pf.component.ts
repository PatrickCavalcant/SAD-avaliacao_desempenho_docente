import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';

import {
  CpfValidator,
  CnpjValidator
} from '../../../../shared/validators';


import { CadastroPf } from '../../models';
import { CadastrarPfService } from '../../services';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-cadastrar-pf',
  templateUrl: './cadastrar-pf.component.html',
  styleUrls: ['./cadastrar-pf.component.css']
})
export class CadastrarPfComponent implements OnInit {
  
  form: FormGroup;

  funcoes = [
    { id: 1, name: "Aluno" },
    { id: 2, name: "Professor" },
    { id: 3, name: "Coordenador/Chefe Dep." }
  ];
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  constructor(
  	private fb: FormBuilder,
  	private snackBar: MatSnackBar,
    private router: Router,
    private cadastrarPfService: CadastrarPfService) { }

  ngOnInit() {
  	this.gerarForm();

  }

  gerarForm() {
  	this.form = this.fb.group({
  		nome: ['', [Validators.required, Validators.minLength(3)]],
  		email: ['', [Validators.required, Validators.email]],
  		senha: ['', [Validators.required, Validators.minLength(6)]],
  		cpf: ['', [Validators.required, CpfValidator]],
  		cnpj: ['', [Validators.required, CnpjValidator]]
  	});
  }

  cadastrarPf() {
  	if (this.form.invalid) {
      return;
    }

    const cadastroPf: CadastroPf = this.form.value;
    this.cadastrarPfService.cadastrar(cadastroPf)
      .subscribe(
        data => {
          const msg: string = "Realize o login para acessar o sistema.";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/login']);
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  	return false;
  }

}
