import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-avalia',
  templateUrl: './avaliar.component.html',
  styleUrls: ['./avaliar.component.css']
})
export class AvaliarComponent implements OnInit {
  private dataAtualEn: string;
  dataAtual: string;

  constructor() {

   }

  ngOnInit(): void {
    this.dataAtual = moment().format('DD/MM/YYYY HH:mm:ss');
  	this.dataAtualEn = moment().format('YYYY-MM-DD HH:mm:ss');
  }


}
