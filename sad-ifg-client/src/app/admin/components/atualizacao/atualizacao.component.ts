import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as moment from 'moment';

import {
  Lancamento,
  Tipo,
  LancamentoService,
  HttpUtilService
} from '../../../shared';

@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.css']
})
export class AtualizacaoComponent implements OnInit {

  form: FormGroup;
  usuarioLogadoId: string;
  horas: string[];
  minutos: string[];
  tipos: string[];
  periodos: string[];
  notas: string[];

  lancamentoId: string;
 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private httpUtil: HttpUtilService,
    private lancamentoService: LancamentoService) { }

  ngOnInit() {
    this.lancamentoId = this.route.snapshot.paramMap.get('lancamentoId');
  	this.horas = this.gerarListaNumeros(0, 23);
  	this.minutos = this.gerarListaNumeros(0, 59);
  	this.tipos = [
  		Tipo.AVALIACAO_ALUNO,
  		Tipo.AUTO_AVALIACAO,
  		Tipo.AVALIACAO_SUPERIOR
  	];
    this.notas = this.gerarListaNumeros(1, 10);

    this.gerarForm();
    this.obterDadosLancamento();
    this.usuarioLogadoId = this.httpUtil.obterIdUsuario();

  }

  obterDadosLancamento() {
    this.lancamentoService.buscarPorId(this.lancamentoId)
      .subscribe(
        dados => {
          const data = dados.data.data;
          this.form.get('data').setValue(data.substr(0, 10));
          this.form.get('horas').setValue(data.substr(11, 2));
          this.form.get('minutos').setValue(data.substr(14, 2));
          this.form.get('tipo').setValue(dados.data.tipo);
          this.form.get('nota').setValue(dados.data.nota);
          this.form.get('periodo').setValue(dados.data.periodo);

        },
        err => {
          let msg: string = "Erro obtendo lançamento";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
          this.router.navigate(['/admin']);
        }
      );
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

  gerarForm() {
  	this.form = this.fb.group({
  		data: ['', [Validators.required]],
  		tipo: ['', [Validators.required]],
      horas: ['', [Validators.required]],
      minutos: ['', [Validators.required]],
      nota: ['', [Validators.required]],
      periodo: ['', [Validators.required]],
  	});
  }

  atualizar() {
  	if (this.form.invalid) return;

    const dados = this.form.value;
    this.lancamentoService.atualizar(this.obterLancamento(dados))
      .subscribe(
        data => {
          const msg: string = "Lançamento atualizado com sucesso!";
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
        dados.nota,
        dados.periodo,
        this.usuarioId,
        this.lancamentoId,
        this.usuarioLogadoId
      );
  }

  get usuarioId(): string {
    return sessionStorage['usuarioId'];
  }

}
