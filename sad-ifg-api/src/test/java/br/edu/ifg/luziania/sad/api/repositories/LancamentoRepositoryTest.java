package br.edu.ifg.luziania.sad.api.repositories;

import static org.junit.Assert.assertEquals;

import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;

import br.edu.ifg.luziania.sad.api.entities.Empresa;
import br.edu.ifg.luziania.sad.api.entities.Usuario;
import br.edu.ifg.luziania.sad.api.entities.Lancamento;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import br.edu.ifg.luziania.sad.api.enums.PerfilEnum;
import br.edu.ifg.luziania.sad.api.enums.TipoEnum;
import br.edu.ifg.luziania.sad.api.services.utils.PasswordUtils;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class LancamentoRepositoryTest {
	
	@Autowired
	private LancamentoRepository lancamentoRepository;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private EmpresaRepository empresaRepository;
	
	private Long usuarioId;

	@Before
	public void setUp() throws Exception {

		Empresa empresa = this.empresaRepository.save(obterDadosEmpresa());

		Usuario usuario = this.usuarioRepository.save(obterDadosUsuario(empresa));
		this.usuarioId = usuario.getId();
		
		this.lancamentoRepository.save(obterDadosLancamentos(usuario));
		this.lancamentoRepository.save(obterDadosLancamentos(usuario));


	}

	@After
	public void tearDown() throws Exception {
		this.empresaRepository.deleteAll();
	}

	@Test
	public void testBuscarLancamentosPorUsuarioId() {
		List<Lancamento> lancamentos = this.lancamentoRepository.findByUsuarioId(usuarioId);
		
		assertEquals(2, lancamentos.size());
	}
	
	@Test
	public void testBuscarLancamentosPorUsuarioIdPaginado() {
		PageRequest page = PageRequest.of(0, 10);
		Page<Lancamento> lancamentos = this.lancamentoRepository.findByUsuarioId(usuarioId, page);
		
		assertEquals(2, lancamentos.getTotalElements());
	}

	private Lancamento obterDadosLancamentos(Usuario usuario) {
		Lancamento lancameto = new Lancamento();
		lancameto.setData(new Date());
		lancameto.setTipo(TipoEnum.AVALIACAO_ALUNO);
		lancameto.setUsuario(usuario);
		return lancameto;
	}

	private Usuario obterDadosUsuario(Empresa empresa) throws NoSuchAlgorithmException {
		Usuario usuario = new Usuario();
		usuario.setNome("Fulano de Tal");
		usuario.setPerfil(PerfilEnum.ROLE_USUARIO);
		usuario.setSenha(PasswordUtils.gerarBCrypt("123456"));
		usuario.setCpf("24291173474");
		usuario.setEmail("email@email.com");
		usuario.setEmpresa(empresa);
		return usuario;
	}

	private Empresa obterDadosEmpresa() {
		Empresa empresa = new Empresa();
		empresa.setRazaoSocial("Empresa de exemplo");
		empresa.setCnpj("51463645000100");
		return empresa;
	}



}
