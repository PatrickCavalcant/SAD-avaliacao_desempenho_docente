
export class Lancamento {

	constructor(public data: string,
				public tipo: string,
				public nota: Number,
				public periodo: string,
				public disciplina: string,
				public usuarioId: string,
				public alunoId: string,
				public id?: string) {}

}
