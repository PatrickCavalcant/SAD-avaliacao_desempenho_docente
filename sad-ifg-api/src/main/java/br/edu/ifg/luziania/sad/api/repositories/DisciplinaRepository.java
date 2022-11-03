package br.edu.ifg.luziania.sad.api.repositories;

import br.edu.ifg.luziania.sad.api.entities.Disciplina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true)
public interface DisciplinaRepository extends JpaRepository<Disciplina, Long> {

    List<Disciplina> findByEmpresaId(Long id);
}
