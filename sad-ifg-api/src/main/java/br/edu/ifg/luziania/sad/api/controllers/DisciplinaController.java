package br.edu.ifg.luziania.sad.api.controllers;

import br.edu.ifg.luziania.sad.api.dtos.DisciplinaDto;
import br.edu.ifg.luziania.sad.api.entities.Disciplina;
import br.edu.ifg.luziania.sad.api.response.Response;
import br.edu.ifg.luziania.sad.api.services.DisciplinaService;
import br.edu.ifg.luziania.sad.api.services.utils.PasswordUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/disciplinas")
@CrossOrigin(origins = "*")
public class DisciplinaController {

	private static final Logger log = LoggerFactory.getLogger(DisciplinaController.class);

	@Autowired
	private DisciplinaService disciplinaService;

	public DisciplinaController() {
	}

	/**
	 * Atualiza os dados de um disciplina.
	 * 
	 * @param id
	 * @param disciplinaDto
	 * @param result
	 * @return ResponseEntity<Response<DisciplinaDto>>
	 * @throws NoSuchAlgorithmException
	 */
	@PutMapping(value = "/{id}")
	public ResponseEntity<Response<DisciplinaDto>> atualizar(@PathVariable("id") Long id,
			@Valid @RequestBody DisciplinaDto disciplinaDto, BindingResult result) throws NoSuchAlgorithmException {
		log.info("Atualizando disciplina: {}", disciplinaDto.toString());
		Response<DisciplinaDto> response = new Response<DisciplinaDto>();

		Optional<Disciplina> disciplina = this.disciplinaService.buscarPorId(id);
		if (!disciplina.isPresent()) {
			result.addError(new ObjectError("disciplina", "Disciplinas não encontrado."));
		}

		this.atualizarDadosDisciplina(disciplina.get(), disciplinaDto, result);

		if (result.hasErrors()) {
			log.error("Erro validando disciplina: {}", result.getAllErrors());
			result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
			return ResponseEntity.badRequest().body(response);
		}

		this.disciplinaService.persistir(disciplina.get());
		response.setData(this.converterDisciplinaDto(disciplina.get()));

		return ResponseEntity.ok(response);
	}

	@GetMapping(value = "/empresa/{id}")
	public ResponseEntity<Response<List<DisciplinaDto>>> atualizar(@PathVariable("id") Long id) {
		log.info("Buscando disciplina por id de empresa: {}", id);
		Response<List<DisciplinaDto>> response = new Response<List<DisciplinaDto>>();

		List<Disciplina> disciplinas = disciplinaService.buscarPorEmpresaId(id);

		response.setData(disciplinas.stream()
				.map(func -> converterDisciplinaDto(func))
				.collect(Collectors.toList()));

		return ResponseEntity.ok(response);
	}

	/**
	 * Atualiza os dados do disciplina com base nos dados encontrados no DTO.
	 * 
	 * @param disciplina
	 * @param disciplinaDto
	 * @param result
	 * @throws NoSuchAlgorithmException
	 */
	private void atualizarDadosDisciplina(Disciplina disciplina, DisciplinaDto disciplinaDto, BindingResult result)
			throws NoSuchAlgorithmException {
		disciplina.setProfessor(disciplinaDto.getProfessor());
		disciplina.setAluno(disciplinaDto.getAluno());
		disciplina.setDisciplina(disciplinaDto.getDisciplina());
		disciplina.setPeriodo(disciplinaDto.getPeriodo());

	}

	/**
	 * Retorna um DTO com os dados de um disciplina.
	 * 
	 * @param disciplina
	 * @return DisciplinaDto
	 */
	private DisciplinaDto converterDisciplinaDto(Disciplina disciplina) {
		DisciplinaDto disciplinaDto = new DisciplinaDto();
		disciplinaDto.setId(disciplina.getId());
		disciplinaDto.setAluno(disciplina.getAluno());
		disciplinaDto.setProfessor(disciplina.getProfessor());
		disciplinaDto.setDisciplina(disciplina.getDisciplina());
		disciplinaDto.setPeriodo(disciplina.getPeriodo());

		return disciplinaDto;
	}

}
