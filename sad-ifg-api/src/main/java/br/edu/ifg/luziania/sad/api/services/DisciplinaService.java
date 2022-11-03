package br.edu.ifg.luziania.sad.api.services;

import br.edu.ifg.luziania.sad.api.entities.Disciplina;

import java.util.List;
import java.util.Optional;

public interface DisciplinaService {
	
	/**
	 * Persiste um disciplina na base de dados.
	 * 
	 * @param disciplina
	 * @return Disciplina
	 */
	Disciplina persistir(Disciplina disciplina);

	/**
	 * Busca e retorna um disciplina por ID.
	 * 
	 * @param id
	 * @return Optional<Disciplina>
	 */
	Optional<Disciplina> buscarPorId(Long id);

    List<Disciplina> buscarPorEmpresaId(Long id);
}
