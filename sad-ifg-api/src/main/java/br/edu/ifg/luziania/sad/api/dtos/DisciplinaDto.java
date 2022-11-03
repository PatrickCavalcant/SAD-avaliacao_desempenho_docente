package br.edu.ifg.luziania.sad.api.dtos;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.Optional;

public class DisciplinaDto {

	private Long id;
	private String professor;
	private String aluno;
	private String disciplina;
	private String periodo;

	public DisciplinaDto() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@NotEmpty(message = "Nome do professor não pode ser vazio.")
	@Length(min = 3, max = 200, message = "Nome do professor deve conter entre 3 e 200 caracteres.")
	public String getProfessor() {
		return professor;
	}

	public void setProfessor(String professor) {
		this.professor = professor;
	}

	@NotEmpty(message = "Nome do aluno não pode ser vazio.")
	@Length(min = 3, max = 200, message = "Nome do aluno deve conter entre 3 e 200 caracteres.")
	public String getAluno() {
		return aluno;
	}

	public void setAluno(String aluno) {
		this.aluno = aluno;
	}


	public String getDisciplina() {
		return disciplina;
	}

	public void setDisciplina(String disciplina) {
		this.disciplina = disciplina;
	}


	public String getPeriodo() {
		return periodo;
	}

	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}



	@Override
	public String toString() {
		return "DisciplinaDto [id=" + id + ", professor=" + professor + ", aluno=" + aluno
				+ ", disciplina=" + disciplina + ", periodo=" + periodo +"]";
	}

}
