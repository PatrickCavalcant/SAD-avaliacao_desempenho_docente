package br.edu.ifg.luziania.sad.api.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

import br.edu.ifg.luziania.sad.api.enums.TipoEnum;

@Entity
@Table(name = "lancamento")
public class Lancamento implements Serializable {
	
	private static final long serialVersionUID = 6524560251526772839L;

	private Long id;
	private Date data;
	private String periodo;
	private String disciplina;
	private String nota;
	private Date dataCriacao;
	private Date dataAtualizacao;
	private TipoEnum tipo;
	private Usuario usuario;
	private Long aluno_id;


	public Lancamento() {
	}

	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY) //altera 21-10-2022 GenerationType.AUTO para conseguir incluir carga via BD
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "data", nullable = false)
	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

	@Column(name = "periodo", nullable = true)
	public String getPeriodo() {
		return periodo;
	}

	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}

	@Column(name = "disciplina", nullable = true)
	public String getDisciplina() {
		return disciplina;
	}

	public void setDisciplina(String disciplina) {
		this.disciplina = disciplina;
	}

	@Column(name = "nota", nullable = true)
	public String getNota() {
		return nota;
	}

	public void setNota(String nota) {
		this.nota = nota;
	}

	@Column(name = "data_criacao", nullable = false)
	public Date getDataCriacao() {
		return dataCriacao;
	}

	public void setDataCriacao(Date dataCriacao) {
		this.dataCriacao = dataCriacao;
	}

	@Column(name = "data_atualizacao", nullable = false)
	public Date getDataAtualizacao() {
		return dataAtualizacao;
	}

	public void setDataAtualizacao(Date dataAtualizacao) {
		this.dataAtualizacao = dataAtualizacao;
	}

	@Enumerated(EnumType.STRING)
	@Column(name = "tipo", nullable = false)
	public TipoEnum getTipo() {
		return tipo;
	}

	public void setTipo(TipoEnum tipo) {
		this.tipo = tipo;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Long getAlunoId() {
		return aluno_id;
	}

	public void setAlunoId(Long aluno_id) {
		this.aluno_id = aluno_id;
	}

	@PreUpdate
    public void preUpdate() {
        dataAtualizacao = new Date();
    }
     
    @PrePersist
    public void prePersist() {
        final Date atual = new Date();
        dataCriacao = atual;
        dataAtualizacao = atual;
    }

	@Override
	public String toString() {
		return "Lancamento [id=" + id + ", data=" + data + ", periodo=" + periodo
				+ ", disciplina=" + disciplina + ", nota=" + nota
				+ ", dataCriacao=" + dataCriacao + ", dataAtualizacao=" + dataAtualizacao
				+ ", tipo=" + tipo + ", usuario=" + usuario + ", aluno_id=" + aluno_id + "]";
	}

}
