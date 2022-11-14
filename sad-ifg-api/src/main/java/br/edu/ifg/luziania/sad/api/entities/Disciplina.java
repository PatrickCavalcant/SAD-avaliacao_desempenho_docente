package br.edu.ifg.luziania.sad.api.entities;

import br.edu.ifg.luziania.sad.api.enums.PerfilEnum;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Entity
@Table(name = "disciplina")
public class Disciplina implements Serializable {

	private static final long serialVersionUID = -5754246207015712518L;

	private Long id;
	private String professor;
	private String professor_id;
	private String aluno;
	private String aluno_id;
	private String disciplina;
	private String periodo;
	private Date dataCriacao;
	private Date dataAtualizacao;
	private Empresa empresa;

	private List<Lancamento> lancamentos;

	public Disciplina() {
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) //altera 21-10-2022 GenerationType.AUTO para conseguir incluir carga via BD
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "professor", nullable = false)
	public String getProfessor() {
		return professor;
	}

	public void setProfessor(String professor) {
		this.professor = professor;
	}

	public String getProfessorId() {
		return professor_id;
	}

	public void setProfessorId(String professor_id) {
		this.professor_id = professor_id;
	}

	@Column(name = "aluno", nullable = false)
	public String getAluno() {
		return aluno;
	}

	public void setAluno(String aluno) {
		this.aluno = aluno;
	}

	public String getAlunoId() {
		return aluno_id;
	}

	public void setAlunoId(String aluno_id) {
		this.aluno_id = aluno_id;
	}

	@Column(name = "disciplina", nullable = false)
	public String getDisciplina() {
		return disciplina;
	}

	public void setDisciplina(String disciplina) {
		this.disciplina = disciplina;
	}

	@Column(name = "periodo", nullable = false)
	public String getPeriodo() {
		return periodo;
	}

	public void setPeriodo(String periodo) {
		this.periodo = periodo;
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

	@ManyToOne(fetch = FetchType.EAGER)
	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}


	@OneToMany(mappedBy = "disciplina", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	public List<Lancamento> getLancamentos() {
		return lancamentos;
	}

	public void setLancamentos(List<Lancamento> lancamentos) {
		this.lancamentos = lancamentos;
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
		return "Disciplina [id=" + id + ", professor_id=" + professor_id + ", professor=" + professor
				+ ", aluno_id=" + aluno_id  + ", aluno=" + aluno
				+ ", dataCriacao=" + dataCriacao + ", dataAtualizacao="	+ dataAtualizacao
				+ ", empresa=" + empresa + ", disciplina=" + disciplina	+ ", periodo=" + periodo + "]";
	}

}