package br.edu.ifg.luziania.sad.api.services.impl;

import br.edu.ifg.luziania.sad.api.entities.Disciplina;
import br.edu.ifg.luziania.sad.api.repositories.DisciplinaRepository;
import br.edu.ifg.luziania.sad.api.services.DisciplinaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DisciplinaServiceImpl implements DisciplinaService {
	
	private static final Logger log = LoggerFactory.getLogger(DisciplinaServiceImpl.class);

	@Autowired
	private DisciplinaRepository disciplinaRepository;
	
	public Disciplina persistir(Disciplina disciplina) {
		log.info("Persistindo disciplina: {}", disciplina);
		return this.disciplinaRepository.save(disciplina);
	}

	
	public Optional<Disciplina> buscarPorId(Long id) {
		log.info("Buscando disciplina pelo ID {}", id);
		return this.disciplinaRepository.findById(id);
	}

	@Override
	public List<Disciplina> buscarPorEmpresaId(Long id) {
		log.info("Buscando disciplina pela empresa ID {}", id);
		return disciplinaRepository.findByEmpresaId(id);
	}

}
