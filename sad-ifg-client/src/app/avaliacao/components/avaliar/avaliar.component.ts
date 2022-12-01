import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

import {
  Usuario,
  UsuarioService,
  Disciplina,
  DisciplinaService,
  LancamentoService,
  Lancamento,
  HttpUtilService
} from '../../../shared';

import { Avaliacao } from '../../models';

import * as $ from 'jquery';


@Component({
  selector: 'app-avalia',
  templateUrl: './avaliar.component.html',
  styleUrls: ['./avaliar.component.css']
})

export class AvaliarComponent implements OnInit {

  form: FormGroup;
  dataSource: MatTableDataSource<Lancamento>;

  private dataAtualEn: string;
  private pagina: number;
  private ordem: string;
  private direcao: string;
  totalLancamentos: number;

  periodo: string;
  disciplina: string;
  todasDisciplinas = new Array();
  pendentesDisciplinas = new Array();
  tipo: string;
  nota: Number;
  cont: Number;
  dataAtual: string;
  professor: string;
  usuarioLogadoId: string;
  usuarioId: string;
  disciplinaId: string;
  alunoId: string;
  professorId: string;
  usuarios: Usuario[];
  usuariosLogado: Usuario[];
  disciplinas: Disciplina[];
  professores: Disciplina[];
  lancamentos: Lancamento[];
  
  
  @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
  @ViewChild('elementDisciplina', { static: true }) elementDisciplina: MatSelect;


  
  constructor( 
    private UsuarioService: UsuarioService,  
    private DisciplinaService: DisciplinaService,  
    private httpUtil: HttpUtilService,
    private LancamentoService: LancamentoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,

    ) {

    }

  ngOnInit(): void {
    this.pagina = 0;
    this.ordemPadrao();
    this.gerarForm();
    this.dataAtual = moment().format('DD/MM/YYYY HH:mm:ss');
    this.dataAtualEn = moment().format('YYYY-MM-DD HH:mm:ss');
    this.getUserData();
    this.usuarioLogadoId = this.httpUtil.obterIdUsuario();
    this.obterDisciplina();
  }


  gerarForm() {
    this.form = this.fb.group({
      userLogado: ['', []],
      funcs:[null, Validators.required]
    });
  }

  //Obter Professor
  get profId(): string {
    return sessionStorage['professorId'] || false;
  }
  
  obterProfessor(){
    this.DisciplinaService.listarDisciplinasPorEmpresa()
    .subscribe(
      dados => {
        const usuarioId: string = this.httpUtil.obterIdUsuario(); //Usuário Logado
        const disciplinaSelecionada: string = this.elementDisciplina.value; //Disciplina selecionada
        this.professores = (dados.data as Disciplina[]) //Lista de Disciplinas
          .filter(prof => prof.disciplina == disciplinaSelecionada && prof.alunoId == usuarioId); //Filtrar as disciplinas pela disciplina selecionada
          const result = this.todasDisciplinas.filter(
            prof => prof.disciplina == disciplinaSelecionada && prof.alunoId == usuarioId);  //Filtra pela disciplina selecionada e Id do usuário
          
          this.professor = result[0].professorId; //recebe o vetor na primeira possição campo "professorId"
          console.log(this.professor);

      },
      err => {
        const msg: string = "Erro obtendo usuários.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    );

  }

  //Obter Usuário Logado
  get userId(): string {
    return sessionStorage['usuarioLogadoId'] || false;
  }

  getUserData(){
    this.UsuarioService.listarUsuariosPorEmpresa()
    .subscribe(
      dataL => {
        const usuarioLogadoId: string = this.httpUtil.obterIdUsuario(); //Usuário Logado
        this.usuariosLogado = (dataL.data as Usuario[]) //Lista de Usuários
        .filter(func => func.id == usuarioLogadoId); //Filto para verificar do usuário logado
        this.form.get('userLogado').setValue(parseInt(this.usuarioLogadoId, 10)); //Passe usuário Id para o matImput

        this.alunoId = this.usuarioLogadoId //usuarioId recebe usuário logado para filtro de lançamentos
        this.exibirLancamentos(); //Chama função exibirLancamentos();

      },
      err => {
        const msg: string = "Erro obtendo usuários.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    );
  }

  //Obter Lançamento pelo usuário logado
  ordemPadrao() {
    this.ordem = 'data';
    this.direcao = 'DESC';
  }


  exibirLancamentos() {
    this.LancamentoService.listarLancamentosPorAluno(
        this.alunoId, this.pagina, this.ordem, this.direcao)
    .subscribe(
      data => {
        this.totalLancamentos = data['data'].totalElements;
        this.lancamentos = (data['data'].content as Lancamento[]) //Lista de Lançamentos pelo usuário logado

        for(var x = 0; x < this.lancamentos.length; x++){ //percorre todos os lancamentos pelo usuário logado
          for(var y = 0; y < this.todasDisciplinas.length; y++){ //percorre todas as disciplinas pelo usuário logado
            if(this.todasDisciplinas[y].disciplina == this.lancamentos[x].disciplina
              && this.todasDisciplinas[y].alunoId == this.lancamentos[x].alunoId){ //Valida se possui algum registro igual entre os arrays

                // this.possuiDisciplinas[cont] = {disciplina: this.todasDisciplinas[y].disciplina,  alunoId: this.todasDisciplinas[y].alunoId};
                delete(this.pendentesDisciplinas[y]); //Deleta o registro igual entre os arrays

            }
          }
        }

        this.DisciplinaService.listarDisciplinasPorEmpresa()
        .subscribe(
          dados => {

          const usuarioId: string = this.httpUtil.obterIdUsuario(); //Usuário Logado
          this.disciplinas = (dados.data as Disciplina[]) //Lista de Disciplinas
            .filter(func => func.alunoId == usuarioId); //Filtrar as disciplinas pelo usuário logado
          
          this.disciplinas = this.pendentesDisciplinas.filter(disc => disc.disciplina != ''); //Lista de Disciplinas
          console.log(this.disciplinas);

          },
          err => {
            const msg: string = "Erro obtendo usuários.";
            this.snackBar.open(msg, "Erro", { duration: 5000 });
          }
        );
      },
      err => {
        const msg: string = "Erro obtendo lançamentos.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    );

  }



  //Obter Disciplina
  get funcId(): string {
    return sessionStorage['usuarioId'] || false;
  }

  obterDisciplina() {
    this.DisciplinaService.listarDisciplinasPorEmpresa()
    .subscribe(
      dados => {
        const usuarioId: string = this.httpUtil.obterIdUsuario(); //Usuário Logado
        this.todasDisciplinas = (dados.data as Disciplina[])
          .filter(func => func.alunoId == usuarioId);
        this.pendentesDisciplinas = (dados.data as Disciplina[])
        // this.disciplinas = (dados.data as Disciplina[]) //Lista de Disciplinas
        //   .filter(func => func.alunoId == usuarioId); //Filtrar as disciplinas pelo usuário logado

          // if (this.funcId) {
          //   this.form.get('funcs').setValue(parseInt(this.usuarioId, 10));
          // }

      },
      err => {
        const msg: string = "Erro obtendo usuários.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    );
  }

  validaForm(){
    console.log("##Disciplina: " + this.elementDisciplina.value);
    console.log("##Professor: " + this.professor);
    console.log("##Usuário: " + this.usuarioLogadoId);
    console.log("##Validação de Formulário");

    if(this.elementDisciplina.value == null){
      const msg: string = "Por favor, preencha o campo Disciplina.";
      this.snackBar.open(msg, "Erro", { duration: 3000 });
      return false
    }
    if($('input[name=nota1]:radio:checked').val() == null){
      const msg: string = "Por favor, preencha a nota da Questão 1.";
      this.snackBar.open(msg, "Erro", { duration: 3000 });
      return false
    }
    if($('input[name=nota2]:radio:checked').val() == null){
      const msg: string = "Por favor, preencha a nota da Questão 2.";
      this.snackBar.open(msg, "Erro", { duration: 3000 });
      return false
    }
    if($('input[name=nota3]:radio:checked').val() == null){
      const msg: string = "Por favor, preencha a nota da Questão 3.";
      this.snackBar.open(msg, "Erro", { duration: 3000 });
      return false
    }
    if($('input[name=nota4]:radio:checked').val() == null){
      const msg: string = "Por favor, preencha a nota da Questão 4.";
      this.snackBar.open(msg, "Erro", { duration: 3000 });
      return false
    }
    if($('input[name=nota5]:radio:checked').val() == null){
      const msg: string = "Por favor, preencha a nota da Questão 5.";
      this.snackBar.open(msg, "Erro", { duration: 3000 });
      return false
    }
    if($('input[name=nota6]:radio:checked').val() == null){
      const msg: string = "Por favor, preencha a nota da Questão 6.";
      this.snackBar.open(msg, "Erro", { duration: 3000 });
      return false
    }
    if($('input[name=nota7]:radio:checked').val() == null){
      const msg: string = "Por favor, preencha a nota da Questão 7.";
      this.snackBar.open(msg, "Erro", { duration: 3000 });
      return false
    }
    if($('input[name=nota8]:radio:checked').val() == null){
      const msg: string = "Por favor, preencha a nota da Questão 8.";
      this.snackBar.open(msg, "Erro", { duration: 3000 });
      return false
    }
    if($('input[name=nota9]:radio:checked').val() == null){
      const msg: string = "Por favor, preencha a nota da Questão 9.";
      this.snackBar.open(msg, "Erro", { duration: 3000 });
      return false
    }
    if($('input[name=nota10]:radio:checked').val() == null){
      const msg: string = "Por favor, preencha a nota da Questão 10.";
      this.snackBar.open(msg, "Erro", { duration: 3000 });
      return false
    }
  }

  gerarNota(){
    
    if(this.validaForm() == false){
      return false
    }
    
    const nota1 = Number($('input[name=nota1]:radio:checked').val());
    const nota2 = Number($('input[name=nota2]:radio:checked').val());
    const nota3 = Number($('input[name=nota3]:radio:checked').val());
    const nota4 = Number($('input[name=nota4]:radio:checked').val())
    const nota5 = Number($('input[name=nota5]:radio:checked').val())
    const nota6 = Number($('input[name=nota6]:radio:checked').val())
    const nota7 = Number($('input[name=nota7]:radio:checked').val())
    const nota8 = Number($('input[name=nota8]:radio:checked').val())
    const nota9 = Number($('input[name=nota9]:radio:checked').val())
    const nota10 = Number($('input[name=nota10]:radio:checked').val())
    const media: number[] = Array();
    let valor: number;
    valor = ((nota1+nota2+nota3+nota4+nota5+nota6+nota7+nota8+nota9+nota10)/10);
    this.nota = valor;
    media.push(valor);

    this.disciplina = this.elementDisciplina.value; 
    console.log(this.disciplina);

    this.cadastrar();

    return media;
  }

  cadastrar() {
  	const lancamento: Lancamento = new Lancamento(
      this.dataAtualEn,
      this.tipo = "AVALIACAO_ALUNO",
      this.nota,
      this.periodo = "2022/2",
      this.disciplina, 
      this.usuarioId = this.professor, //Professor avaliado
      this.usuarioLogadoId
    );


    this.LancamentoService.cadastrar(lancamento)
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


  

}
