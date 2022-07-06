import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

@Component({
  selector: 'app-avalia',
  templateUrl: './avaliar.component.html',
  styleUrls: ['./avaliar.component.css']
})
export class AvaliarComponent implements OnInit {

  dataAtual: string;

  usuarioId: string;
  usuarios: Usuario[];
  
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
  }

  gerarForm() {
    this.form = this.fb.group({
      funcs: ['', []]
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
            this.form.get('funcs').setValue(parseInt(this.funcId, 10));
          }
        },
        err => {
          const msg: string = "Erro obtendo usuários.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }


}
