package br.edu.ifg.luziania.sad.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import br.edu.ifg.luziania.sad.api.entities.Lancamento;

public interface LancamentoService {

	/**
	 * Retorna uma lista paginada de lançamentos de um determinado funcionário.
	 * 
	 * @param usuarioId
	 * @param pageRequest
	 * @return Page<Lancamento>
	 */
	Page<Lancamento> buscarPorUsuarioId(Long usuarioId, PageRequest pageRequest);
	
	/**
	 * Retorna um lançamento por ID.
	 * 
	 * @param id
	 * @return Optional<Lancamento>
	 */
	Optional<Lancamento> buscarPorId(Long id);
	
	/**
	 * Persiste um lançamento na base de dados.
	 * 
	 * @param lancamento
	 * @return Lancamento
	 */
	Lancamento persistir(Lancamento lancamento);
	
	/**
	 * Remove um lançamento da base de dados.
	 * 
	 * @param id
	 */
	void remover(Long id);

	/**
	 * Retorna o último lançamento por ID de usuário.
	 *
	 * @param usuarioId
	 * @return Optional<Lancamento>
	 */
    Optional<Lancamento> buscarUltimoPorUsuarioId(Long usuarioId);

	/**
	 * Retorna uma lista com todos os lançamentos de um determinado usuário.
	 *
	 * @param usuarioId
	 * @return List<Lancamento>
	 */
    List<Lancamento> buscarTodosPorUsuarioId(Long usuarioId);
}
