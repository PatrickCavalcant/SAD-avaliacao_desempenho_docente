import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

import {
  Usuario,
  UsuarioService,
  HttpUtilService
} from '../../../shared';

import { Avaliacao } from '../../models';


@Component({
  selector: 'app-avalia',
  templateUrl: './avaliar.component.html',
  styleUrls: ['./avaliar.component.css']
})
export class AvaliarComponent implements OnInit {
  dataAtual: string;
  usuarioLogadoId: string;
  usuarioId: string;
  usuarios: Usuario[];
  usuariosLogado: Usuario[];

  @ViewChild('nota1') nota1:ElementRef; 
  @ViewChild('nota2') nota2:ElementRef; 
  @ViewChild('nota3') nota3:ElementRef; 
  @ViewChild('nota4') nota4:ElementRef; 
  @ViewChild('nota5') nota5:ElementRef; 
  @ViewChild('nota6') nota6:ElementRef; 
  @ViewChild('nota7') nota7:ElementRef; 
  @ViewChild('nota8') nota8:ElementRef; 
  @ViewChild('nota9') nota9:ElementRef; 
  @ViewChild('nota10') nota10:ElementRef; 

  @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
  form: FormGroup;
  constructor( 
    private UsuarioService: UsuarioService,  
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {

   }

  ngOnInit(): void {
    this.obterUsuarios();
    this.gerarForm();
    this.dataAtual = moment().format('DD/MM/YYYY HH:mm:ss');
    this.getUserData();

  }

  gerarForm() {
    this.form = this.fb.group({
      userLogado: ['', []],
      nota1: ['', [Validators.required]]
    });

      

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
            .filter(func => func.id != usuarioId); //Filto para retirada do usuário Administrador

          if (this.funcId) {
            this.form.get('funcs').setValue(parseInt(this.usuarioId, 10));
          }
        },
        err => {
          const msg: string = "Erro obtendo usuários.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }



  get userId(): string {
    return sessionStorage['usuarioLogadoId'] || false;
  }

  getUserData(){
    this.UsuarioService.listarUsuariosPorEmpresa()
    .subscribe(
      dataL => {
        const usuarioLogadoId: string = this.httpUtil.obterIdUsuario();
        this.usuariosLogado = (dataL.data as Usuario[])
        .filter(func => func.id == usuarioLogadoId); //Filto para retirada do usuário logado
        this.form.get('userLogado').setValue(parseInt(this.usuarioLogadoId, 10));


      },
      err => {
        const msg: string = "Erro obtendo usuários.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    );
  }

  gerarNota(){
    const nota1 = parseFloat(this.nota1.nativeElement.value);
    const nota2 = parseFloat(this.nota2.nativeElement.value);
    const nota3 = parseFloat(this.nota3.nativeElement.value);
    const nota4 = parseFloat(this.nota4.nativeElement.value);
    const nota5 = parseFloat(this.nota5.nativeElement.value);
    const nota6 = parseFloat(this.nota6.nativeElement.value);
    const nota7 = parseFloat(this.nota7.nativeElement.value);
    const nota8 = parseFloat(this.nota8.nativeElement.value);
    const nota9 = parseFloat(this.nota9.nativeElement.value);
    const nota10 = parseFloat(this.nota10.nativeElement.value);
    const media: number[] = Array();

    let valor: number;

    valor = ((nota1+nota2+nota3+nota4+nota5+nota6+nota7+nota8+nota9+nota10)/10);
    console.log(valor);

    media.push(valor);
    return media;
  }
}
