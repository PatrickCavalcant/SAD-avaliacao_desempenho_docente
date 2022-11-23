package br.edu.ifg.luziania.sad.api.dtos;

import java.util.Optional;

import javax.validation.constraints.NotEmpty;

public class LancamentoDto {
	
	private Optional<Long> id = Optional.empty();
	private String data;
	private String tipo;
	private String periodo;
	private String disciplina;
	private String nota;
	private Long usuarioId;
	private Long aluno_id;

	public LancamentoDto() {
	}

	public Optional<Long> getId() {
		return id;
	}

	public void setId(Optional<Long> id) {
		this.id = id;
	}

	@NotEmpty(message = "Data não pode ser vazia.")
	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getPeriodo() {
		return periodo;
	}

	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}

	public String getDisciplina() {
		return disciplina;
	}

	public void setDisciplina(String disciplina) {
		this.disciplina = disciplina;
	}

	public String getNota() {
		return nota;
	}

	public void setNota(String nota) {
		this.nota = nota;
	}

	public Long getAlunoId() {
		return aluno_id;
	}

	public void setAlunoId(Long aluno_id) {
		this.aluno_id = aluno_id;
	}

	public Long getUsuarioId() {
		return usuarioId;
	}

	public void setUsuarioId(Long usuarioId) {
		this.usuarioId = usuarioId;
	}

	@Override
	public String toString() {
		return "LancamentoDto [id=" + id + ", data=" + data + ", tipo=" + tipo
				+ ", periodo=" + periodo + ", disciplina=" + disciplina
				+ ", nota=" + nota + ", usuarioId=" + usuarioId
				+ ", aluno_id" + aluno_id + "]";
	}
	
}
