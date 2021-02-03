#############################
#         README            #
#############################

Arquivo de Instruções para Rodar o Sistema Ficha Técnica:

1) Aplicações a se instalar:

Para se rodar a aplicação, é necessário a instalação da última versão(14.15.4) do Interpretador Node
que pode ser baixado no link:

https://nodejs.org/en/download/

Para facilitar as alterações em arquivo, recomendo fortemente a instação do Notepad++, encontrado no link

https://notepad-plus-plus.org/downloads/


2) Configuração de Banco:

Na pasta principal da aplicação existe uma subpasta chamada "database" e dentro um arquivo chamado
database.js. Esse arquivo é o arquivo de configuração de acesso a banco de dados. Atualmente foram testadas 
as interfaces para MySql e SqlServer, logo é necessário que na máquina tenha instalado alguma das duas opções.
Será necessário primeiramente criar um schema no banco do cliente chamado "fichatecnica", tudo minúsculo
e sem espaços.

Abrindo o arquivo database.js, existem três blocos comentados onde:

1.1) Primeiro Bloco: MySql (linha 6 a linha 11):

// const conn = new Sequelize('fichatecnica','root','sa123',{
//     host: 'localhost',
//     dialect: 'mysql',
//     port:3306,
//     timezone:"-04:00"
// })

Para se usar conexão com banco MySql, após criar o schema "fichatecnica" descomentar o trecho e inserir dados de usuario no lugar de
"root" e senha no ludar de "sa123", assim como o host específico e a porta usada.

 const conn = new Sequelize('fichatecnica','root','sa123',{
     host: 'localhost',
     dialect: 'mysql',
     port:3306,
     timezone:"-04:00"
 })
 
 
1.2) Segundo Bloco: SqlServer (linha 15 a linha 24):

// const conn = new Sequelize('fichatecnica', 'root', 'sa123', {
//     host: 'localhost',
//     dialect: 'mssql',
//     timezone:"-04:00",
//     dialectOptions: {
//         options: {
//             encrypt: true,
//         }
//     }
//   });

Para se usar conexão com banco SqlServer, após criar o schema "fichatecnica" descomentar o trecho e inserir dados de usuario no lugar de
"root" e senha no ludar de "sa123", assim como o host específico e a porta usada.

 const conn = new Sequelize('fichatecnica', 'root', 'sa123', {
     host: 'localhost',
     dialect: 'mssql',
     timezone:"-04:00",
     dialectOptions: {
         options: {
             encrypt: true,
         }
     }
   });
   
   
1.3) Terceiro Bloco:  SqlServer (linha 15 a linha 24):
 
 Em caso da opção anterior der algum problema, tentar esse terceiro bloco para banco de dados SqlServer, fazendo os ajsutes conforme
 instrução anterior:
 
   var conn = new Sequelize({
     dialect: 'mssql',
     dialectModulePath: 'sequelize-msnodesqlv8',
     dialectOptions: {
       instanceName: 'MSSQLSERVER01',
       trustedConnection: true
     },
     host: 'localhost',
     database: 'fichatecnica'
   });
   
   
 3) Criando as tabelas
 
 Uma vez criado o schema e configurado o arquivo database.js, você deverá voltar para a pasta principal atraves do prompt com o domando CD.
 No notepad++, você devera abrir o arquivo index.js da pasta principal e localizar um trecho comentado da linha 95 a linha 124 , conforme abaixo
 
 
 //     Tipo.sync();
//     Maquinas.sync();
//     User.sync();
//     Produtos.sync();
//     MateriaPrima.sync();
//     Moldes.sync();
//     Clientes.sync();
//     FichaTecnicaToshiba.sync();
//     LimitesFichaTecnicaToshiba.sync();
//     ParametrosReaisToshiba.sync();   
//     ParametrosReaisAutomata.sync();        
//     LimiteParametrosToshiba.sync();
//     LimiteParametrosAutomata.sync();
    // Alertas.sync();
    // AlertasAbertos.sync();


//     User.create({
//     nome:"admin",
//     email:"admin@email.com",
//     password:hash,
//     matricula:"00000"        
// })

//     Tipo.create({
//         tipo:"Toshiba"
//     });
//     Tipo.create({
//         tipo:"Automata OPTIN"
//     })


Descomente todo esse Trecho deixando assim:

    Tipo.sync();
    Maquinas.sync();
    User.sync();
    Produtos.sync();
    MateriaPrima.sync();
    Moldes.sync();
    Clientes.sync();
    FichaTecnicaToshiba.sync();
    LimitesFichaTecnicaToshiba.sync();
    ParametrosReaisToshiba.sync();   
    ParametrosReaisAutomata.sync();        
    LimiteParametrosToshiba.sync();
    LimiteParametrosAutomata.sync();
    Alertas.sync();
    AlertasAbertos.sync();


    User.create({
    nome:"admin",
    email:"admin@email.com",
    password:hash,
    matricula:"00000"        
})

    Tipo.create({
        tipo:"Toshiba"
    });
    Tipo.create({
        tipo:"Automata OPTIN"
    })
	
	
salve e mantenha aberto. Voltando no prompt, que deverá estar na pasta raiz do projeto, você escrevera o comando:

npm install

e aguardará o fim do processo. Quando estiver finalizado, você rodará o comando 

nodemon

e aguardará finalizar a escrita de comandos sql na tela. Uma vez finalizado, você dará ctrl+z no notepad++, comentando novamente
o trecho que você descomentou a pouco, deixando novamente assim:

//     Tipo.sync();
//     Maquinas.sync();
//     User.sync();
//     Produtos.sync();
//     MateriaPrima.sync();
//     Moldes.sync();
//     Clientes.sync();
//     FichaTecnicaToshiba.sync();
//     LimitesFichaTecnicaToshiba.sync();
//     ParametrosReaisToshiba.sync();   
//     ParametrosReaisAutomata.sync();        
//     LimiteParametrosToshiba.sync();
//     LimiteParametrosAutomata.sync();
    // Alertas.sync();
    // AlertasAbertos.sync();


//     User.create({
//     nome:"admin",
//     email:"admin@email.com",
//     password:hash,
//     matricula:"00000"        
// })

//     Tipo.create({
//         tipo:"Toshiba"
//     });
//     Tipo.create({
//         tipo:"Automata OPTIN"
//     })

Salve e pode fechar o Notepad++.

4) Condireções Gerais

- A aplicação rodará tanto em localhost quanto no ip da máquina
- A Aplicação rodará sobre a porta 3000, caso essa porta esteja ocupada alterar o valor 3000 no trecho das linhas 131 a 133 do arquivo
index.js, localizado na raiz do projeto, conforme abaixo:

app.listen(3000,"0.0.0.0",() => {
    console.log("Servidor Rodando");
})
