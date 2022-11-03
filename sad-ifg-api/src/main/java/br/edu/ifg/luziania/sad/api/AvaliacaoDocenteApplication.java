package br.edu.ifg.luziania.sad.api;

import br.edu.ifg.luziania.sad.api.entities.Empresa;
import br.edu.ifg.luziania.sad.api.entities.Usuario;
import br.edu.ifg.luziania.sad.api.entities.Lancamento;
import br.edu.ifg.luziania.sad.api.enums.PerfilEnum;
import br.edu.ifg.luziania.sad.api.enums.TipoEnum;
import br.edu.ifg.luziania.sad.api.repositories.EmpresaRepository;
import br.edu.ifg.luziania.sad.api.repositories.UsuarioRepository;
import br.edu.ifg.luziania.sad.api.repositories.LancamentoRepository;
import br.edu.ifg.luziania.sad.api.services.utils.PasswordUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.stereotype.Component;

import java.util.Date;

@SpringBootApplication
@EnableCaching
public class AvaliacaoDocenteApplication {

	@Autowired
	private EmpresaRepository empresaRepository;

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private LancamentoRepository lancamentoRepository;

	public static void main(String[] args) {
		SpringApplication.run(AvaliacaoDocenteApplication.class, args);
	}

	@Component
	public class CommandLineAppStartupRunner implements CommandLineRunner {

		@Override
		public void run(String...args) throws Exception {
			Empresa empresa = new Empresa();
			empresa.setRazaoSocial("Empresa Teste");
			empresa.setCnpj("99999999999999");
			empresaRepository.save(empresa);

			Usuario usuarioAdmin = new Usuario();
			usuarioAdmin.setCpf("25164061422");
			usuarioAdmin.setEmail("admin@empresa.com");
			usuarioAdmin.setNome("Administrador");
			usuarioAdmin.setPerfil(PerfilEnum.ROLE_ADMIN);
			usuarioAdmin.setSenha(PasswordUtils.gerarBCrypt("123456"));
			usuarioAdmin.setEmpresa(empresa);
			usuarioRepository.save(usuarioAdmin);

			Usuario usuario = new Usuario();
			usuario.setCpf("09943636211");
			usuario.setEmail("teste2@empresa.com");
			usuario.setNome("Joao Freitas Oliveira");
			usuario.setPerfil(PerfilEnum.ROLE_USUARIO);
			usuario.setSenha(PasswordUtils.gerarBCrypt("123456"));
			usuario.setEmpresa(empresa);
			usuarioRepository.save(usuario);

			Usuario usuarioDocente = new Usuario();
			usuarioDocente.setCpf("09943636212");
			usuarioDocente.setEmail("teste@empresa.com");
			usuarioDocente.setNome("Joao Freitas Pereira");
			usuarioDocente.setPerfil(PerfilEnum.ROLE_USUARIO);
			usuarioDocente.setSenha(PasswordUtils.gerarBCrypt("123456"));
			usuarioDocente.setEmpresa(empresa);
			usuarioRepository.save(usuarioDocente);

			empresaRepository.findAll().forEach(System.out::println);
			//usuarioRepository.findAll().forEach(System.out::println);
			usuarioRepository.findByEmpresaId(empresa.getId()).forEach(System.out::println);

			gerarLancamentos(usuario, 20);
			gerarLancamentos(usuarioDocente, 20);
		}
	}

	private void gerarLancamentos(Usuario usuario, int numLancamentos) {
		int tipoPos = 0;
		TipoEnum[] tipos = TipoEnum.values();

		Lancamento lancamento;
		for (int i=0; i<3; i++) {
			lancamento = new Lancamento();
			lancamento.setData(new Date());
			lancamento.setTipo(tipos[tipoPos++]);
			lancamento.setNota("09");
			lancamento.setPeriodo("2022/1");
			lancamento.setUsuario(usuario);
			lancamentoRepository.save(lancamento);
			if (tipoPos == tipos.length) {
				tipoPos = 0;
			}
		}
	}


}
