package br.edu.ifg.luziania.sad.api.dtos;

import java.util.Optional;

import javax.validation.constraints.NotEmpty;

public class LancamentoDto {
	
	private Optional<Long> id = Optional.empty();
	private String data;
	private String tipo;
	private String periodo;
	private String discipina;
	private String nota;
	private Long usuarioId;

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

	public String getDiscipina() {
		return discipina;
	}

	public void setDiscipina(String discipina) {
		this.discipina = discipina;
	}

	public String getNota() {
		return nota;
	}

	public void setNota(String nota) {
		this.nota = nota;
	}

	public Long getUsuarioId() {
		return usuarioId;
	}

	public void setUsuarioId(Long usuarioId) {
		this.usuarioId = usuarioId;
	}

	@Override
	public String toString() {
		return "LancamentoDto [id=" + id + ", data=" + data + ", tipo=" + tipo + ", periodo=" + periodo
				+ ", nota=" + nota + ", usuarioId=" + usuarioId + "]";
	}
	
}
