package br.edu.ifg.luziania.sad.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import br.edu.ifg.luziania.sad.api.entities.Usuario;

import java.util.List;

@Transactional(readOnly = true)
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	Usuario findByCpf(String cpf);

	Usuario findByEmail(String email);

	Usuario findByCpfOrEmail(String cpf, String email);

    List<Usuario> findByEmpresaId(Long id);
}
