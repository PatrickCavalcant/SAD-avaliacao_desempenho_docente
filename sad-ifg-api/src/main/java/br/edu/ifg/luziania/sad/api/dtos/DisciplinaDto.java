package br.edu.ifg.luziania.sad.api.dtos;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.br.CNPJ;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.Optional;

public class DisciplinaDto {

	private Optional<Long> id = Optional.empty();
	private String professor_id;
	private String aluno_id;
	private String professor;
	private String aluno;
	private String disciplina;
	private String periodo;
	private String cnpj;

	public DisciplinaDto() {
	}

	public Optional<Long> getId() {
		return id;
	}

	public void setId(Optional<Long> id) {
		this.id = id;
	}

	public String getProfessorId() {
		return professor_id;
	}

	public void setProfessorId(String professor_id) {
		this.professor_id = professor_id;
	}

	@NotEmpty(message = "Nome do professor não pode ser vazio.")
	@Length(min = 3, max = 200, message = "Nome do professor deve conter entre 3 e 200 caracteres.")
	public String getProfessor() {
		return professor;
	}

	public void setProfessor(String professor) {
		this.professor = professor;
	}

	public String getAlunoId() {
		return aluno_id;
	}

	public void setAlunoId(String aluno_id) {
		this.aluno_id = aluno_id;
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

	@NotEmpty(message = "CNPJ não pode ser vazio.")
	@CNPJ(message="CNPJ inválido.")
	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	@Override
	public String toString() {
		return "DisciplinaDto [id=" + id + ", professor_id=" + professor_id + ", professor=" + professor
				+ ", aluno=" + aluno + ", aluno_id=" + aluno_id
				+ ", disciplina=" + disciplina + ", periodo=" + periodo + ", cnpj=" + cnpj + "]";
	}

}