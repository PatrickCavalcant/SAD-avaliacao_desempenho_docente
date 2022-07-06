import { Pipe, PipeTransform } from '@angular/core';

import { Tipo } from '../models';

@Pipe({
  name: 'tipo'
})
export class TipoPipe implements PipeTransform {

  transform(tipo: Tipo, args?: any): string {
    return this.obterTexto(tipo);
  }

  obterTexto(tipo: Tipo): string {
  	let tipoDesc: string;
  	switch (tipo) {
  		case Tipo.AVALIACAO_ALUNO:
  			tipoDesc = 'Avaliação do Aluno';
  			break;
  		case Tipo.AUTO_AVALIACAO:
  			tipoDesc = 'Autoavaliação ';
  			break;
  		case Tipo.AVALIACAO_SUPERIOR:
  			tipoDesc = 'Avaliação do Superior ';
  			break;
  		default:
  			tipoDesc = tipo;
  			break;
  	}
  	return tipoDesc;
  }

}
