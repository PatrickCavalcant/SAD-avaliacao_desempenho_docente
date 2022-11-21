import { Lancamento } from './lancamento.model';

export class Disciplina {

	constructor(public alunoId: string,
				public aluno: string,
				public professorId: string,
				public professor: string,
				public cpf: string,
				public disciplina: string,
				public valorHora?: string,
				public periodo?: string,
				public cnpj?: string,
				public id?: string) {}

}
