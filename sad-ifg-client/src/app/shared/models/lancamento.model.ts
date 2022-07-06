
export class Lancamento {

	constructor(public data: string,
				public tipo: string,
				public nota: string,
				public periodo: string,
				public usuarioId: string,
				public id?: string) {}

}
