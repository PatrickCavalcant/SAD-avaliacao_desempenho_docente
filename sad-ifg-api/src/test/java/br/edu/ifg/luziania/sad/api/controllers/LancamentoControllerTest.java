package br.edu.ifg.luziania.sad.api.controllers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

import br.edu.ifg.luziania.sad.api.dtos.LancamentoDto;
import br.edu.ifg.luziania.sad.api.entities.Usuario;
import br.edu.ifg.luziania.sad.api.entities.Lancamento;
import br.edu.ifg.luziania.sad.api.enums.TipoEnum;
import br.edu.ifg.luziania.sad.api.services.UsuarioService;
import br.edu.ifg.luziania.sad.api.services.LancamentoService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class LancamentoControllerTest {

	@Autowired
	private MockMvc mvc;
	
	@MockBean
	private LancamentoService lancamentoService;
	
	@MockBean
	private UsuarioService usuarioService;
	
	private static final String URL_BASE = "/api/lancamentos/";
	private static final Long ID_USUARIO = 1L;
	private static final Long ID_LANCAMENTO = 1L;
	private static final String TIPO = TipoEnum.AVALIACAO_ALUNO.name();
	private static final Date DATA = new Date();
	
	private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	@Test
	@WithMockUser
	public void testCadastrarLancamento() throws Exception {
		Lancamento lancamento = obterDadosLancamento();
		BDDMockito.given(this.usuarioService.buscarPorId(Mockito.anyLong())).willReturn(Optional.of(new Usuario()));
		BDDMockito.given(this.lancamentoService.persistir(Mockito.any(Lancamento.class))).willReturn(lancamento);

		mvc.perform(MockMvcRequestBuilders.post(URL_BASE)
				.content(this.obterJsonRequisicaoPost())
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.data.id").value(ID_LANCAMENTO))
				.andExpect(jsonPath("$.data.tipo").value(TIPO))
				.andExpect(jsonPath("$.data.data").value(this.dateFormat.format(DATA)))
				.andExpect(jsonPath("$.data.usuarioId").value(ID_USUARIO))
				.andExpect(jsonPath("$.errors").isEmpty());
	}
	
	@Test
	@WithMockUser
	public void testCadastrarLancamentoUsuarioIdInvalido() throws Exception {
		BDDMockito.given(this.usuarioService.buscarPorId(Mockito.anyLong())).willReturn(Optional.empty());

		mvc.perform(MockMvcRequestBuilders.post(URL_BASE)
				.content(this.obterJsonRequisicaoPost())
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.errors").value("Usuário não encontrado. ID inexistente."))
				.andExpect(jsonPath("$.data").isEmpty());
	}
	
	@Test
	@WithMockUser(username = "admin@admin.com", roles = {"ADMIN"})
	public void testRemoverLancamento() throws Exception {
		BDDMockito.given(this.lancamentoService.buscarPorId(Mockito.anyLong())).willReturn(Optional.of(new Lancamento()));

		mvc.perform(MockMvcRequestBuilders.delete(URL_BASE + ID_LANCAMENTO)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());
	}
	
	@Test
	@WithMockUser
	public void testRemoverLancamentoAcessoNegado() throws Exception {
		BDDMockito.given(this.lancamentoService.buscarPorId(Mockito.anyLong())).willReturn(Optional.of(new Lancamento()));

		mvc.perform(MockMvcRequestBuilders.delete(URL_BASE + ID_LANCAMENTO)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isForbidden());
	}

	private String obterJsonRequisicaoPost() throws JsonProcessingException {
		LancamentoDto lancamentoDto = new LancamentoDto();
		lancamentoDto.setId(null);
		lancamentoDto.setData(this.dateFormat.format(DATA));
		lancamentoDto.setTipo(TIPO);
		lancamentoDto.setUsuarioId(ID_USUARIO);
		ObjectMapper mapper = new ObjectMapper();
		return mapper.writeValueAsString(lancamentoDto);
	}

	private Lancamento obterDadosLancamento() {
		Lancamento lancamento = new Lancamento();
		lancamento.setId(ID_LANCAMENTO);
		lancamento.setData(DATA);
		lancamento.setTipo(TipoEnum.valueOf(TIPO));
		lancamento.setUsuario(new Usuario());
		lancamento.getUsuario().setId(ID_USUARIO);
		return lancamento;
	}	

}
