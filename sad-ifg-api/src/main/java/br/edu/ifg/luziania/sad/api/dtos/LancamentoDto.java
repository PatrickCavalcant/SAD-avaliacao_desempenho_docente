package br.edu.ifg.luziania.sad.api.dtos;

import java.util.Optional;

import javax.validation.constraints.NotEmpty;

public class LancamentoDto {
	
	private Optional<Long> id = Optional.empty();
	private String data;
	private String tipo;
	private String periodo;
	private String nota;
	private Long funcionarioId;

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
	
	public String getNota() {
		return nota;
	}

	public void setNota(String nota) {
		this.nota = nota;
	}

	public Long getFuncionarioId() {
		return funcionarioId;
	}

	public void setFuncionarioId(Long funcionarioId) {
		this.funcionarioId = funcionarioId;
	}

	@Override
	public String toString() {
		return "LancamentoDto [id=" + id + ", data=" + data + ", tipo=" + tipo + ", periodo=" + periodo
				+ ", nota=" + nota + ", funcionarioId=" + funcionarioId + "]";
	}
	
}
