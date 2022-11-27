import { Lancamento } from './lancamento.model';

export class Disciplina {

	constructor(public alunoId: string,
				public aluno: string,
				public professorId: string,
				public professor: string,
				public disciplina: string,
				public periodo?: string,
				public cnpj?: string,
				public id?: string) {}

}
