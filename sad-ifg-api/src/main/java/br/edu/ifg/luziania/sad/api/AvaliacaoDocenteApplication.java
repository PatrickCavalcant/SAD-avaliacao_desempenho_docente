package br.edu.ifg.luziania.sad.api;

import br.edu.ifg.luziania.sad.api.entities.Empresa;
import br.edu.ifg.luziania.sad.api.entities.Funcionario;
import br.edu.ifg.luziania.sad.api.entities.Lancamento;
import br.edu.ifg.luziania.sad.api.enums.PerfilEnum;
import br.edu.ifg.luziania.sad.api.enums.TipoEnum;
import br.edu.ifg.luziania.sad.api.repositories.EmpresaRepository;
import br.edu.ifg.luziania.sad.api.repositories.FuncionarioRepository;
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
	private FuncionarioRepository funcionarioRepository;

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
			empresa.setCnpj("36763168000104");
			empresaRepository.save(empresa);

			Funcionario funcionarioAdmin = new Funcionario();
			funcionarioAdmin.setCpf("25164061422");
			funcionarioAdmin.setEmail("admin@empresa.com");
			funcionarioAdmin.setNome("Administrador");
			funcionarioAdmin.setPerfil(PerfilEnum.ROLE_ADMIN);
			funcionarioAdmin.setSenha(PasswordUtils.gerarBCrypt("123456"));
			funcionarioAdmin.setEmpresa(empresa);
			funcionarioRepository.save(funcionarioAdmin);

			Funcionario funcionario = new Funcionario();
			funcionario.setCpf("09943636211");
			funcionario.setEmail("funcionario@empresa.com");
			funcionario.setNome("Funcionário");
			funcionario.setPerfil(PerfilEnum.ROLE_USUARIO);
			funcionario.setSenha(PasswordUtils.gerarBCrypt("123456"));
			funcionario.setEmpresa(empresa);
			funcionarioRepository.save(funcionario);

			empresaRepository.findAll().forEach(System.out::println);
			//funcionarioRepository.findAll().forEach(System.out::println);
			funcionarioRepository.findByEmpresaId(empresa.getId()).forEach(System.out::println);

			gerarLancamentos(funcionario, 20);
		}
	}

	private void gerarLancamentos(Funcionario funcionario, int numLancamentos) {
		int tipoPos = 0;
		TipoEnum[] tipos = TipoEnum.values();

		Lancamento lancamento;
		for (int i=0; i<3; i++) {
			lancamento = new Lancamento();
			lancamento.setData(new Date());
			lancamento.setTipo(tipos[tipoPos++]);
			lancamento.setNota("9");
			lancamento.setPeriodo("2022/1");
			lancamento.setFuncionario(funcionario);
			lancamentoRepository.save(lancamento);
			if (tipoPos == tipos.length) {
				tipoPos = 0;
			}
		}
	}

}
