import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatStepperIntl} from '@angular/material/stepper';

import * as moment from 'moment';

import {
  Lancamento,
  Tipo,
  LancamentoService,
  HttpUtilService
} from '../../../shared';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  secondFormGroup: FormGroup;
  firstFormGroup: FormGroup  
  form: FormGroup;
  horas: string[];
  minutos: string[];
  tipos: string[];
  nota: Number;
  disciplina: string
  usuarioLogadoId: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private httpUtil: HttpUtilService,
    private lancamentoService: LancamentoService) { }
    private _formBuilder: FormBuilder
    
  ngOnInit() {
  	this.gerarForm();
  	this.horas = this.gerarListaNumeros(0, 23);
  	this.minutos = this.gerarListaNumeros(0, 59);
  	this.tipos = [
  		Tipo.AVALIACAO_ALUNO,
  		Tipo.AUTO_AVALIACAO,
  		Tipo.AVALIACAO_SUPERIOR
  	];
    this.usuarioLogadoId = this.httpUtil.obterIdUsuario();

  }

  gerarForm() {
    this.form = this.fb.group({
      data: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      horas: ['', [Validators.required]],
      minutos: ['', [Validators.required]]
    });
  }

  gerarListaNumeros(inicio: number, termino: number): string[] {
  	const numeros: string[] = Array();
  	for (let i = inicio; i <= termino; i++) {
  		let numero: string = i.toString();
  		if (i < 10) {
  			numero = "0" + numero;
  		}
  		numeros.push(numero);
  	}
  	return numeros;
  }

  cadastrar() {
    if (this.form.invalid) return;

    const dados = this.form.value;
    this.lancamentoService.cadastrar(this.obterLancamento(dados))
      .subscribe(
        data => {
          const msg: string = "Lançamento cadastrado com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/admin']);
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  obterLancamento(dados: any): Lancamento {
    const data = moment(dados.data);
    data.set({
      hour: dados.horas,
      minute: dados.minutos,
      second: 0
    });

    return new Lancamento(
        data.format('YYYY-MM-DD HH:mm:ss'),
        dados.tipo,
        this.nota,
        this.disciplina,
        '',
        this.usuarioId,
        this.usuarioLogadoId
      );
  }

  get usuarioId(): string {
    return sessionStorage['usuarioId'];
  }


}

