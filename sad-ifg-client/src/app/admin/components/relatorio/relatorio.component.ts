import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import * as $ from 'jquery';


import {
  LancamentoService,
  Lancamento,
  Usuario,
  Tipo,
  HttpUtilService,
  UsuarioService,
  Disciplina,
  DisciplinaService
} from '../../../shared';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  fileName= 'ExcelSheet.xlsx';
  panelRelUsuario = true;

  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = ['data', 'tipo', 'periodo', 'disciplina', 'nota', 'acao'];
  usuarioId: string;
  totalLancamentos: number;
  todasDisciplinas = new Array();
  todosLancamentos = new Array();
  disciplinas: Disciplina[];
  usuarios: Usuario[];

  @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
  @ViewChild('elementRelatorio', { static: true }) elementRelatorio: MatSelect;

  form: FormGroup;

  private pagina: number;
  private ordem: string;
  private direcao: string;
  public paginaAtual = 1;
  

  constructor(
  	private lancamentoService: LancamentoService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private UsuarioService: UsuarioService,
    private DisciplinaService: DisciplinaService,  
    private dialog: MatDialog) { }

  ngOnInit() {
    this.gerarForm();
    this.obterUsuarios(); 
    this.obterDisciplina();
    this.obterLancamentos()

    /* ocutar os elementos */
    $("#panelRelatorioUsuarios").hide(); 
    $("#panelRelatorioDisciplinas").hide(); 
    $("#panelRelatorioLancamentos").hide(); 
    
  }

  gerarForm() {
    this.form = this.fb.group({
      funcs: ['', []]
    });
  }

  disponibilizaRelatorio(){
    if($("#tipoRelatorio").val() == "usuarios"){
      $("#panelRelatorioUsuarios").show(); //mostra os elementos ocultos
      $("#panelRelatorioDisciplinas").hide(); //ocutar os elementos
      $("#panelRelatorioLancamentos").hide(); //ocutar os elementos


    }else if($("#tipoRelatorio").val() == "disciplinas"){
      $("#panelRelatorioDisciplinas").show(); //mostra os elementos ocultos
      $("#panelRelatorioUsuarios").hide(); //ocutar os elementos
      $("#panelRelatorioLancamentos").hide(); //ocutar os elementos
      
    }else if($("#tipoRelatorio").val() == "lancamentos"){
      $("#panelRelatorioLancamentos").show(); //mostra os elementos ocultos
      $("#panelRelatorioUsuarios").hide(); //ocutar os elementos
      $("#panelRelatorioDisciplinas").hide(); //ocutar os elementos

    }
  }

  gerarRelatorios(): void {
    if($("#tipoRelatorio").val() == "usuarios"){

      /* passe aqui o id da tabela */
      let element = document.getElementById('tabela-usuarios');
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  
      /* gerar pasta de trabalho e adicionar a planilha */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
      /* salvar em arquivo */  
      XLSX.writeFile(wb, this.fileName);

    }else if($("#tipoRelatorio").val() == "disciplinas"){

      /* passe aqui o id da tabela */
      let element = document.getElementById('tabela-disciplinas');
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  
      /* gerar pasta de trabalho e adicionar a planilha */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
      /* salvar em arquivo */  
      XLSX.writeFile(wb, this.fileName);

    }else if($("#tipoRelatorio").val() == "lancamentos"){

      /* passe aqui o id da tabela */
      let element = document.getElementById('tabela-lancamentos');
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  
      /* gerar pasta de trabalho e adicionar a planilha */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
      /* salvar em arquivo */  
      XLSX.writeFile(wb, this.fileName);

    }
  }   

  ordemPadrao() {
    this.ordem = 'data';
    this.direcao = 'DESC';
  }

  get funcId(): string {
    return sessionStorage['usuarioId'] || false;
  }

  obterUsuarios() {
    this.UsuarioService.listarUsuariosPorEmpresa()
      .subscribe(
        data => {
          const usuarioId: string = this.httpUtil.obterIdUsuario();
          this.usuarios = (data.data as Usuario[])
            .filter(func => func.id != usuarioId);

          if (this.funcId) {
            this.form.get('funcs').setValue(parseInt(this.funcId, 10));
            this.exibirLancamentos();
          }
        },
        err => {
          const msg: string = "Erro obtendo usuários.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  exibirLancamentos() {
    if (this.matSelect.selected) {
      this.usuarioId = this.matSelect.selected['value'];
    } else if (this.funcId) {
      this.usuarioId = this.funcId;
    } else {
      return;
    }
    sessionStorage['usuarioId'] = this.usuarioId;

    this.lancamentoService.listarLancamentosPorUsuario(
        this.usuarioId, this.pagina, this.ordem, this.direcao)
      .subscribe(
        data => {
          this.totalLancamentos = data['data'].totalElements;
          const lancamentos = data['data'].content as Lancamento[];
          this.dataSource = new MatTableDataSource<Lancamento>(lancamentos);
          console.log(this.dataSource);
        },
        err => {
          const msg: string = "Erro obtendo lançamentos.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  paginar(pageEvent: PageEvent) {
    this.pagina = pageEvent.pageIndex;
    this.exibirLancamentos();
  }

  ordenar(sort: Sort) {
    if (sort.direction == '') {
      this.ordemPadrao();
    } else {
      this.ordem = sort.active;
      this.direcao = sort.direction.toUpperCase();
    }
    this.exibirLancamentos();
  }

  obterDisciplina() {
    this.DisciplinaService.listarDisciplinasPorEmpresa()
    .subscribe(
      dados => {
        this.todasDisciplinas = (dados.data as Disciplina[])

      },
      err => {
        const msg: string = "Erro obtendo disciplina.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    );
  }

  obterLancamentos() {
    this.lancamentoService.listarLancamentos()
    .subscribe(
      dados => {
        this.todosLancamentos = (dados.data as Lancamento[]);

        for(var x = 0; x < this.todosLancamentos.length; x++){ //percorre todos os lancamentos 
          for(var y = 0; y < this.usuarios.length; y++){ //percorre todos os usuários
            if(this.todosLancamentos[x].alunoId == this.usuarios[y].id){ //Valida se id do aluno é igual ao do usuário
              this.todosLancamentos[x].alunoId =  this.usuarios[y].nome //alunoId recebe o nome de usuário
            
            }
            if(this.todosLancamentos[x].usuarioId == this.usuarios[y].id){ //Valida se id do professor é igual ao do usuário
              this.todosLancamentos[x].usuarioId =  this.usuarios[y].nome //professorId recebe o nome de usuário

            }
          }
        }

        // .filter(user => user.alunoId == this.usuarios.id);

      },
      err => {
        const msg: string = "Erro obtendo lancamento.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    );
  }
}

