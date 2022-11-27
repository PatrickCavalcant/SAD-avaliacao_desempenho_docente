import { Lancamento } from './lancamento.model';

export class Usuario {

	constructor(public nome: string,
				public email: string,
				public cpf: string,
				public perfil: string,
				public lancamentos?: Lancamento[],
				public id?: string) {}

}
