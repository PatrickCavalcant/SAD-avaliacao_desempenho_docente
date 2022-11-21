[![author](https://img.shields.io/badge/author-patrick-red.svg)](https://www.linkedin.com/in/patrick-cavalcante-moraes-a95635179/)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/PatrickCavalcant)

# SAD-avaliacao_desempenho_docente
TCC -  (SAD  - Sistema de Avaliação Desempenho Docente do Instituto Federal de Goiás)

<p>
  Conforme relatado neste trabalho procura-se construir um sistema que contemple as recomendações da instituição, desde as ferramentas já utilizadas, passando pela      escolha das tecnologias de desenvolvimento, a preparação do sistema e a adequada da utilização dos resultados, até os métodos de implantação a ações de manutenção.
</p>

<p>
  Este projeto de pesquisa tem como objetivo apresentar a necessidade de um SAD para o apoio das demandas de avaliação de desempenho docente da Comissão Permanente de Pessoal Docente (CPPD) e entregar uma melhoria importante para a organização, podendo assim facilitar o processo de progressão dos docentes da instituição.
</p>

<p>
 O projeto aqui desenvolvido utiliza como padrão o Angular 12 integrado com uma API Restful criada com Spring Boot e Java.</br>
A integração consistui em consumir uma API Restful em Spring e Java, com cadastro de usuários, autenticação via token JWT (JSON Web Token) e CRUDs de cadastro, que incluem listagem de dados com paginação e ordenação.
</p>

<a href="https://github.com/PatrickCavalcant/SAD-avaliacao_desempenho_docente/tree/main/sad-ifg-api"> <h3> Sistema de Avaliação Desempenho Docente API RESTful</h3> </a>
API do sistema do SAD com Java e Spring Boot.
### Como executar a aplicação

```
./mvn spring-boot:run
API será executada em http://localhost:8080
```

<a href="https://github.com/PatrickCavalcant/ponto-inteligente/tree/main/ponto-inteligente-client"> <h3> Sistema de Avaliação Desempenho Docente Cliente </h3> </a>
Código cliente Angular 12 do sistema SAD.
### Como executar a aplicação
O código cliente depende da API RESTful, que deverá estar configurada e em execução como requisito.
Para executar o cliente (após a execução da API RESTful), execute os seguintes passos:
```
cd ponto-inteligente-client
npm install -g @angular/cli
npm install
```

Será necessário a instalação do JQuery:
```
npm install --save-dev @types/jquery
npm install --save jquery
```
Após basta iniciar a aplicação:
```
npm start
```
Acesse a aplicação em [http://localhost:4200](http://localhost:4200)  


<h4>O foi desenvolvido: </h4>
Criado aplicações com recursos avançados do Angular </br>
Consumir uma API RESTful criada em Spring Boot/Java </br>
Criar aplicações com o Angular Material </br>
Autenticação e autorização de acesso com tokens JWT (JSON Web Token)</br>
Trabalhar com rotas entre componentes</br>
Criar Guards para adicionar segurança e controle as rotas</br>
Criar formulários reativos</br>
Validação de dados</br>
Cria validadores personalizados para CPF e CNPJ</br>
Aplicar máscara a campos como data, CPF e CNPJ</br>
Utilizar componentes como Date Picker e janelas modais</br>
Criar tabelas de listagem de dados com paginação e ordenação</br>
Criar tabelas de listagem de dados Lazy loading</br>
Criar formulários com recursos avançados.</br>


*Para sua execução certifique-se também de possuir o [NodeJS](http://nodejs.org).*  
*A instalação do @angular/cli acima pode necessitar ser executada como admin do sistema*  

<p>
    Tela de Login <br/>
    <img src="img/SAD1.jpeg" width="800"><br/>
    Home <br/>
    <img src="img/SAD2.jpeg" width="800"><br/>
    Tela de Avaliação Docente <br/>
    <img src="img/SAD3.png" width="800"><br/>
</p>
