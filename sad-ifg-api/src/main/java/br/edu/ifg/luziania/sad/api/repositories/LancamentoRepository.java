package br.edu.ifg.luziania.sad.api.repositories;

import java.util.List;

import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import br.edu.ifg.luziania.sad.api.entities.Lancamento;

@Transactional(readOnly = true)
@NamedQueries({
		@NamedQuery(name = "LancamentoRepository.findByUsuarioId",
				query = "SELECT lanc FROM Lancamento lanc WHERE lanc.usuario.id = :usuarioId")})

public interface LancamentoRepository extends JpaRepository<Lancamento, Long> {

	List<Lancamento> findByUsuarioId(@Param("usuarioId") Long usuarioId);

	Page<Lancamento> findByAlunoId(@Param("alunoId") Long alunoId, Pageable pageable);

	Page<Lancamento> findByUsuarioId(@Param("usuarioId") Long usuarioId, Pageable pageable);


	Lancamento findFirstByUsuarioIdOrderByDataCriacaoDesc(Long usuarioId);

	List<Lancamento> findByUsuarioIdOrderByDataDesc(Long usuarioId);





}
