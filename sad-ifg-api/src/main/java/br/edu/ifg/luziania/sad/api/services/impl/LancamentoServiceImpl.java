package br.edu.ifg.luziania.sad.api.services.impl;

import java.util.List;
import java.util.Optional;

import br.edu.ifg.luziania.sad.api.repositories.LancamentoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import br.edu.ifg.luziania.sad.api.entities.Lancamento;
import br.edu.ifg.luziania.sad.api.services.LancamentoService;

@Service
public class LancamentoServiceImpl implements LancamentoService {

	private static final Logger log = LoggerFactory.getLogger(LancamentoServiceImpl.class);

	@Autowired
	private LancamentoRepository lancamentoRepository;

	public Page<Lancamento> buscarPorAlunoId(Long alunoId, PageRequest pageRequest) {
		log.info("Buscando lançamentos para o aluno ID {}", alunoId);
		return this.lancamentoRepository.findByAlunoId(alunoId, pageRequest);
	}

	public Page<Lancamento> buscarPorUsuarioId(Long usuarioId, PageRequest pageRequest) {
		log.info("Buscando lançamentos para o usuário ID {}", usuarioId);
		return this.lancamentoRepository.findByUsuarioId(usuarioId, pageRequest);
	}

	public List<Lancamento> buscarTodosPorUsuarioId(Long usuarioId) {
		log.info("Buscando todos os lançamentos para o usuário ID {}", usuarioId);
		return this.lancamentoRepository.findByUsuarioIdOrderByDataDesc(usuarioId);
	}


	
	@Cacheable("lancamentoPorId")
	public Optional<Lancamento> buscarPorId(Long id) {
		log.info("Buscando um lançamento pelo ID {}", id);
		return this.lancamentoRepository.findById(id);
	}
	
	@CachePut("lancamentoPorId")
	public Lancamento persistir(Lancamento lancamento) {
		log.info("Persistindo o lançamento: {}", lancamento);
		return this.lancamentoRepository.save(lancamento);
	}
	
	public void remover(Long id) {
		log.info("Removendo o lançamento ID {}", id);
		this.lancamentoRepository.deleteById(id);
	}

	@Override
	public Optional<Lancamento> buscarUltimoPorUsuarioId(Long usuarioId) {
		log.info("Buscando o último lançamento por ID de usuário {}", usuarioId);
		return Optional.ofNullable(
				this.lancamentoRepository.findFirstByUsuarioIdOrderByDataCriacaoDesc(usuarioId));
	}


}
