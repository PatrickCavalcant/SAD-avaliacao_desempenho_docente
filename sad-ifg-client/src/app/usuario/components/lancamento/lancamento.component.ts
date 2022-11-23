import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatStepperIntl} from '@angular/material/stepper';

import {
  Tipo,
  LancamentoService,
  Lancamento,
  HttpUtilService
} from '../../../shared';

import * as moment from 'moment';

declare var navigator: any;

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css'],
})
export class LancamentoComponent implements OnInit {
  secondFormGroup: FormGroup;
  firstFormGroup: FormGroup
  form: FormGroup;

  private dataAtualEn: string;
  dataAtual: string;
  geoLocation: string;
  periodo: string
  disciplina: string
  tipo: string;
  nota: Number;
  ultimoTipoLancado: string;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private httpUtil: HttpUtilService,
    private lancamentoService: LancamentoService,
    private _formBuilder: FormBuilder
    
   ) { }

  ngOnInit() {
  	this.dataAtual = moment().format('DD/MM/YYYY HH:mm:ss');
  	this.dataAtualEn = moment().format('YYYY-MM-DD HH:mm:ss');
  	this.obterGeoLocation();
    this.ultimoTipoLancado = '';
    this.obterUltimoLancamento();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
  }
  gerarForm() {
  	this.form = this.fb.group({
  		nota1: ['', [Validators.required, Validators.minLength(1)]],
  		nota2: ['', [Validators.required, Validators.minLength(1)]],
  		nota3: ['', [Validators.required, Validators.minLength(1)]],
  	});
  }

  obterGeoLocation(): string {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>
        	this.geoLocation = `${position.coords.latitude},${position.coords.longitude}`);
    }
    return '';
  }

  obterUltimoLancamento() {
    this.lancamentoService.buscarUltimoTipoLancado()
      .subscribe(
        data => {
          this.ultimoTipoLancado = data.data ? data.data.tipo : '';
        },
        err => {
          const msg: string = "Erro obtendo último lançamento.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  gerarNota(){
;
    const media: number[] = Array();

    let valor: number;

    console.log(valor);
    this.nota = 10;
    this.tipo = "AUTO_AVALIACAO";

    media.push(valor);
    this.cadastrar();
    return media;
  }


  cadastrar() {
  	const lancamento: Lancamento = new Lancamento(
      this.dataAtualEn,
      this.tipo,
      this.nota,
      this.periodo,
      this.disciplina = "teste",
      this.disciplina = "teste", //Aluno_id
      this.httpUtil.obterIdUsuario()
    );


    this.lancamentoService.cadastrar(lancamento)
      .subscribe(
        data => {
          const msg: string = "Lançamento realizado com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/usuario/listagem']);
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

  obterUrlMapa(): string {
  	return "https://www.google.com/maps/search/?api=1&query=" +
  		this.geoLocation;
  }

  exibirInicioTrabalho(): boolean {
  	return this.ultimoTipoLancado == '' ||
  		this.ultimoTipoLancado == Tipo.AVALIACAO_ALUNO;
  }

  exibirTerminoTrabalho(): boolean {
  	return this.ultimoTipoLancado == Tipo.AVALIACAO_ALUNO ||
  		this.ultimoTipoLancado == Tipo.AVALIACAO_SUPERIOR;
  }

  exibirInicioAlmoco(): boolean {
  	return this.ultimoTipoLancado == Tipo.AVALIACAO_ALUNO;
  }

  exibirTerminoAlmoco(): boolean {
  	return this.ultimoTipoLancado == Tipo.AUTO_AVALIACAO;
  }
  
}
