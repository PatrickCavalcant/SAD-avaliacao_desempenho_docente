import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as moment from 'moment';

import {
  Lancamento,
  Tipo,  
  Usuario,
  LancamentoService,
  HttpUtilService,
  UsuarioService
} from '../../../shared';

@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.css']
})
export class AtualizacaoComponent implements OnInit {

  form: FormGroup;
  alunoId: string;
  periodo: string;
  disciplina: string;
  professor: string;
  aluno: string;
  tipo: string;

  horas: string[];
  minutos: string[];
  tipos: string[];
  periodos: string[];
  disciplinas: string[];
  notas: string[];
  usuarios: Usuario[];


  lancamentoId: string;
 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private httpUtil: HttpUtilService,
    private UsuarioService: UsuarioService,
    private lancamentoService: LancamentoService) { }

  ngOnInit() {
    this.lancamentoId = this.route.snapshot.paramMap.get('lancamentoId');
  	this.horas = this.gerarData(0, 23);
  	this.minutos = this.gerarData(0, 59);


    this.notas = this.gerarListaNumeros(1, 10);

    this.gerarForm();
    this.obterDadosLancamento();
    // this.usuarioLogadoId = this.httpUtil.obterIdUsuario();

  }

  obterDadosLancamento() {
    this.lancamentoService.buscarPorId(this.lancamentoId)
      .subscribe(
        dados => {
          const data = dados.data.data;
          this.form.get('data').setValue(data.substr(0, 10));
          this.form.get('horas').setValue(data.substr(11, 2));
          this.form.get('minutos').setValue(data.substr(14, 2));
          this.tipo = dados.data.tipo;
          this.form.get('nota').setValue(dados.data.nota);
          this.periodo = dados.data.periodo;
          this.disciplina = dados.data.disciplina;
          this.alunoId = dados.data.alunoId;
          this.form.get('disciplina').setValue(this.disciplina);
          this.form.get('periodo').setValue(this.periodo);
          this.obterUsuarios();




        },
        err => {
          let msg: string = "Erro obtendo lançamento";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
          this.router.navigate(['/admin']);
        }
      );
  }

  gerarData(inicio: number, termino: number): string[] {
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

  gerarListaNumeros(inicio: number, termino: number): string[] {
  	const numeros: string[] = Array();
  	for (let i = inicio; i <= termino; i++) {
  		let numero: string = i.toString();
  		if (i < 10) {
  			numero;
  		}
  		numeros.push(numero);
  	}
  	return numeros;
  }

  gerarForm() {
  	this.form = this.fb.group({
  		data: ['', [Validators.required]],
      horas: ['', [Validators.required]],
      minutos: ['', [Validators.required]],
      nota: ['', [Validators.required]],
      periodo: ['', [Validators.required]],
      disciplina: ['', [Validators.required]],


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
        this.tipo,
        dados.nota,
        this.periodo,
        this.disciplina,
        this.usuarioId,
        this.alunoId,
        this.lancamentoId

      );
  }

  get usuarioId(): string {
    return sessionStorage['usuarioId'];
  }

  obterUsuarios() {
    this.UsuarioService.listarUsuariosPorEmpresa()
      .subscribe(
        data => {
          const resultAluno = this.usuarios = (data.data as Usuario[]) //obtem todos os usuários
            .filter(func => func.id == this.alunoId); //filtra pelo id do aluno
          this.aluno = resultAluno[0].nome; //recebe o nome do aluno

          const resultprofessor = this.usuarios = (data.data as Usuario[]) //obtem todos os usuários
            .filter(func => func.id == this.usuarioId); //filtra pelo id do professor
          this.professor = resultprofessor[0].nome; //recebe o nome do professor

        },
        err => {
          const msg: string = "Erro obtendo usuários.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

}

