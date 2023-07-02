# RPCW2023-Projeto - Base de Dados de Acordãos

Desenvolvido no âmbito da unidade curricular de Representação e Processamento de Conhecimento e Web, do Mestrado Integrado em Engenharia Informática da Universidade do Minho.

## Autores
- Daniel Faria - PG50306
- Hugo Brandão - PG50418
- João Cerquido - PG50469


## Introdução
Como tema para este projeto prático escolhemos o tema nº. 4: Base de Dados de Acordãos.
O objetivo deste projeto é a criação de um serviço web, capaz de armazenar e disponibilizar a informação presente no conjunto de acordãos que são disponibilizados pelos vários tribunais portugueses. Para tal criamos scripts para a interpretação e preparação dos dados, importamos esses mesmos dados para uma base de dados MongoDB e criamos um serviço web que permite a consulta desses mesmos dados. Para a lógica dos utilizadores, criamos um outro serviço que permite a criação de utilizadores e a autenticação dos mesmos.

## Interpretação e preparação dos dados 

Primeiramente, de modo a perceber elos de ligação e keys iguais entre os 14 datasets, realizamos um estudo pormenorizado a cada um deles. Ao que identificamos as 4 principais keys que eram encontradas em todos os datasets e que de facto eram referentes a informação relevante e que deveria estar na página principal do nosso Website, sendo elas o "Processo", a "Data", "Tribunal" e "Descritores". Com estes 4 campos, de modo a tornar o nosso programa mais eficiente, criamos um ficheiro geral, que possui estas informações de todos os acordãos de todos os tribunais. Este ficheiro foi gerado através do nosso script "gerarCollectionGeral.py" que vai obter todas informações desejadas de todos os acordãos e também o Id de todos, que depois é utilizado na identificação dos acordãos. Para além da criação deste ficheiro também criamos um script que altera o formato de todas as datas do dataset geral para o formato aaaa/mm/dd, para facilitar a ordenação dos acordãos por data. Por fim, para analisar o formato dos modelos de cada tribunal para o mongodb, utilizamos o script "contador.py".

## Utilização do programa

Após os dados estarem tratados e importados para a base de dados, é necessário instalar as dependencias usando o comando:

    npm install

Sendo que os serviços poderão ser inicializados(acordaosApp e authServer), utilizando, nas respetivas pastas, o comando:
    
    npm start

 Com os serviços a correr, o utilizador poderá aceder ao website estando este a correr na porta 7777, onde poderá consultar os acordãos, filtrando por tribunal ou por descritores ou fazendo uma pesquisa usando a nossa barra de pesquisa. Para além disso, o utilizador poderá também fazer login, caso já tenha conta, ou criar uma nova conta, caso ainda não tenha. Estando autenticado o utilizador terá acesso a mais funcionalidades, como a possibilidade de adicionar um acordão aos favoritos(podendo adicionar uma descrição a esse favorito), sugerir um novo acordão, consultar o seu perfil e os seus favoritos, podendo editar alguns dos campos, e por fim, fazer logout. Quando o utilizador tem o nível de administrador, para além de ter acesso a todas as funcionalidades de um utilizador normal, tem também a possibilidade de eliminar, editar e adicionar acordãos e aceitar sugestões de acordãos realizadas por utilizadores normais.

## Página Inicial
Utilizando o nosso dataset geral, apresentamos na página inicial do nosso site todos os acordãos ordenados por data e com informação acerca do processo, descritores e tribunal. Do lado esquerdo estão presentes os filtros disponíveis que serão explicados mais à frente neste relatório. Possui também um botão para adicionar ou sugerir novos acordãos, dependendo do nível do utilizador, assim como botões de login, logout e informações do perfil do utilizador. Para além disto temos um barra de pesquisa e também um botão de ajuda com as informações da utilização do site. Devido ao grande número de acordão implementamos um sistema de páginas em que podemos trocar de página no footer.

## Filtragem de acordãos

Para mostrar a lista de acordãos ao cliente, fazemos uso da coleção geral anteriormente mencionada, sendo os filtros aplicados sobre esta.

Os vários filtros são enviados para o servidor através da query string, sendo que o servidor faz uso destes para filtrar os acordãos.

### Filtro por tribunal

Para conseguir filtrar os acordãos por tribunal, fazemos uso de uma query que procura todos os acordãos que tenham o campo tribunal igual ao tribunal que o cliente pretende.
Para obter a lista de tribunais, utilizamos um simples aggregate em que agrupamos os acordãos por tribunal, obtendo assim uma lista de todos os tribunais e a sua frequência, apresentando a lista, ordenada por frequência, ao cliente.

### Filtro por descritores

Para obter uma lista de descritores, fazemos uso de um aggregate em que agrupamos os acordãos por descritor, obtendo assim uma lista de todos os descritores e a sua frequência, apresentando apenas os 30 descritores mais frequentes ao cliente. Caso o cliente pretenda procurar um descritor que não esteja na lista, pode fazê-lo através da barra de pesquisa.

### Barra de Pesquisa

Para a barra de pesquisa, criamos um índice de texto dos campos:
- Nº do processo
- Data
- Tribunal
- Descritores

Assim, quando o cliente faz uma pesquisa, o servidor faz uso deste índice para procurar os acordãos que contenham uma das palavras pesquisadas em algum dos campos acima mencionados.
Se o cliente pretender pesquisar por uma frase, pode fazê-lo colocando a frase entre aspas.

## Utilizadores

### Utilizadores não autenticados:

Os utilizadores não autenticados apenas podem consultar os acordãos, filtrando por tribunal ou por descritores ou fazer uma pesquisa usando a barra de pesquisa.

### Utilizadores normais(nivel=user):

Estes utilizadores são capazes de fazer tudo o que um utilizador não autenticado pode fazer, mas também podem adicionar acordãos aos favoritos, sugerir novos acordãos, consultar o seu perfil e os seus favoritos, podendo editar alguns dos campos, e por fim, fazer logout.

#### Favoritos

Para adicionar um acordão aos favoritos, o utilizador deve clicar no botão de adicionar aos favoritos presente na página inicial. Ao clicar nesse botão, é solicitado ao utilizador que adicione uma breve descrição ao favorito. Após adicionar a descrição, o acordão é adicionado aos favoritos do utilizador. O utilizador pode consultar os seus favoritos na página do seu perfil, onde pode também editar a descrição de cada favorito ou remover o favorito. Também é possível retirar um acordão dos favoritos na página inicial, clicando no botão de adicionar aos favoritos mais uma vez.

#### Sugestões

Para sugerir um novo acordão, o utilizador deve clicar no botão de sugerir acordão presente na página inicial. Ao clicar nesse botão, o utilizador é redirecionado para uma página onde pode adicionar um novo acordão, selecionando a que tribunal pertence. Após esta seleção irá aparecer um formulário onde o utilizador pode adicionar os dados do acordão. Após adicionar os dados, o utilizador pode submeter o acordão, sendo este enviado para a base de dados, para que um administrador possa aceitar ou rejeitar a sugestão.

#### Perfil

Na página de perfil um utilizador o mesmo poderá alterar o seu nome, email, filiação e password. Para além disso, poderá também consultar os seus favoritos, podendo editar a descrição de cada favorito ou remover o favorito.

### Administradores(nivel=admin):

Estes utilizadores são capazes de fazer tudo o que um utilizador normal pode fazer, mas também podem eliminar, editar e adicionar acordãos e aceitar sugestões de acordãos realizadas por utilizadores normais.

Para adicionar um novo acordão à base de dados, o administrador deve clicar no botão de adicionar acordão presente na página inicial. Ao clicar nesse botão, o administrador é redirecionado para uma página onde pode adicionar um novo acordão, selecionando a que tribunal pertence. Após esta seleção irá aparecer um formulário onde o administrador pode adicionar os dados do acordão. Após adicionar os dados, o administrador pode submeter o acordão, sendo este enviado para a base de dados.

Para aceitar ou recusar uma sugestão de acordão, o administrador deve clicar no botão de sugestões presente na página inicial. Ao clicar nesse botão, o administrador é redirecionado para uma página onde pode consultar todas as sugestões de acordão. Para aceitar uma sugestão, o administrador deve clicar no botão de aceitar presente na sugestão. Para recusar uma sugestão o administrador deve clicar no botão de recusar presente na sugestão. Ao aceitar uma sugestão, o acordão sugerido é adicionado à base de dados. Ao recusar uma sugestão, a sugestão é removida da base de dados.