package br.edu.ifg.luziania.sad.api.controllers;

import br.edu.ifg.luziania.sad.api.dtos.CadastroPFDto;
import br.edu.ifg.luziania.sad.api.dtos.CadastroPJDto;
import br.edu.ifg.luziania.sad.api.dtos.DisciplinaDto;
import br.edu.ifg.luziania.sad.api.entities.Disciplina;
import br.edu.ifg.luziania.sad.api.entities.Empresa;
import br.edu.ifg.luziania.sad.api.entities.Usuario;
import br.edu.ifg.luziania.sad.api.enums.PerfilEnum;
import br.edu.ifg.luziania.sad.api.response.Response;
import br.edu.ifg.luziania.sad.api.services.DisciplinaService;

import br.edu.ifg.luziania.sad.api.services.EmpresaService;
import br.edu.ifg.luziania.sad.api.services.utils.PasswordUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/disciplinas")
@CrossOrigin(origins = "*")
public class DisciplinaController {

	private static final Logger log = LoggerFactory.getLogger(DisciplinaController.class);

	@Autowired
	private EmpresaService empresaService;

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

	/**
	 * Adiciona um nova disciplina.
	 *
	 * @param disciplinaDto
	 * @param result
	 * @return ResponseEntity<Response<DisciplinaDto>>
	 * @throws NoSuchAlgorithmException
	 */
	@PostMapping
	public ResponseEntity<Response<DisciplinaDto>> adicionar(@Valid @RequestBody DisciplinaDto disciplinaDto,
			BindingResult result) throws NoSuchAlgorithmException {
		log.info("Adicionando lançamento: {}", disciplinaDto.toString());
		Response<DisciplinaDto> response = new Response<DisciplinaDto>();

		validarDadosExistentes(disciplinaDto, result);
		Disciplina disciplina = this.converterDtoParaDisciplina(disciplinaDto, result);

		if (result.hasErrors()) {
			log.error("Erro validando lançamento: {}", result.getAllErrors());
			result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
			return ResponseEntity.badRequest().body(response);
		}

		Optional<Empresa> empresa = this.empresaService.buscarPorCnpj(disciplinaDto.getCnpj());
		empresa.ifPresent(emp -> disciplina.setEmpresa(emp));
		this.disciplinaService.persistir(disciplina);

//		disciplina = this.disciplinaService.persistir(disciplina);
		response.setData(this.converterDisciplinaDto(disciplina));
		return ResponseEntity.ok(response);
	}
	/**
	 * Retorna um disciplina por ID.
	 *
	 * @param id
	 * @return ResponseEntity<Response<DisciplinaDto>>
	 */
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
	 * Verifica se a empresa está cadastrada e se o usuário não existe na base de dados.
	 *
	 * @param disciplinaDto
	 * @param result
	 */
	private void validarDadosExistentes(DisciplinaDto disciplinaDto, BindingResult result) {
		Optional<Empresa> empresa = this.empresaService.buscarPorCnpj(disciplinaDto.getCnpj());
		if (!empresa.isPresent()) {
			result.addError(new ObjectError("empresa", "Empresa não cadastrada."));
		}
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
		disciplina.setProfessorId(disciplinaDto.getProfessorId());
		disciplina.setProfessor(disciplinaDto.getProfessor());
		disciplina.setAlunoId(disciplinaDto.getAlunoId());
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
		disciplinaDto.setId(Optional.of(disciplina.getId()));
		disciplinaDto.setProfessorId(disciplina.getProfessorId());
		disciplinaDto.setProfessor(disciplina.getProfessor());
		disciplinaDto.setAlunoId(disciplina.getAlunoId());
		disciplinaDto.setAluno(disciplina.getAluno());
		disciplinaDto.setDisciplina(disciplina.getDisciplina());
		disciplinaDto.setPeriodo(disciplina.getPeriodo());
		disciplinaDto.setCnpj(disciplina.getEmpresa().getCnpj());

		return disciplinaDto;
	}



	/**
	 * Converte um DisciplinaDto para uma entidade Disciplina.
	 *
	 * @param disciplinaDto
	 * @param result
	 * @return Disciplina
	 * @throws NoSuchAlgorithmException
	 */
	private Disciplina converterDtoParaDisciplina(DisciplinaDto disciplinaDto, BindingResult result)
			throws NoSuchAlgorithmException {
		Disciplina disciplina = new Disciplina();

		if (disciplinaDto.getId().isPresent()) {
			Optional<Disciplina> lanc = this.disciplinaService.buscarPorId(disciplinaDto.getId().get());
			if (lanc.isPresent()) {
				disciplina = lanc.get();
			} else {
				result.addError(new ObjectError("disciplina", "Disciplina não encontrado."));
			}
		}
		disciplina.setAlunoId(disciplinaDto.getAlunoId());
		disciplina.setAluno(disciplinaDto.getAluno());
		disciplina.setProfessorId(disciplinaDto.getProfessorId());
		disciplina.setProfessor(disciplinaDto.getProfessor());
		disciplina.setDisciplina(disciplinaDto.getDisciplina());
		disciplina.setPeriodo(disciplinaDto.getPeriodo());


		return disciplina;
	}


}

