# SAD - Sistema de Avaliação Docente (Cliente)
Código cliente Angular 12 do sistema de avaliação.
### Como executar a aplicação
O código cliente depende da API RESTful [https://github.com/PatrickCavalcant/sad-ifg-api](https://github.com/PatrickCavalcant/SAD-avaliacao_desempenho_docente/tree/main/sad-ifg-api), que deverá estar configurada e em execução como requisito.
Para executar o cliente (após a execução da API RESTful), execute os seguintes passos:<br/>

*Para sua execução certifique-se também de possuir o [NodeJS](http://nodejs.org).*  <br/>
Necessário o NodeJS 10 ou superior instalado em seu computador antes de prosseguir. Verifique a versão atual do seu NodeJS com o seguinte comando no terminal:<br/>
<h2>Node JS - v12.19.0 </h2>

```
Node JS - v12.19.0 --Versão Homologada
node --version 
```
** REINICIE A MAQUINA **
```
cd sad-ifg-client
npm install -g @angular/cli
npm install -g @angular/cli@9.1.3 - Versão Homologada
npm start
```
Acesse a aplicação em [http://localhost:4200](http://localhost:4200)  

*A instalação do @angular/cli acima pode necessitar ser executada como admin do sistema*  

