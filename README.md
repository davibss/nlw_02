#  Proffy - NextLevelWeek 2

## Sobre o projeto

Proffy - é uma forma de conectar professores que desejam dar aulas e alunos com motivação para estudar e aprender.


Projeto desenvolvido durante a **NLW - Next Level Week** oferecida pela [Rocketseat](https://www.rocketseat.com.br/).
O NLW é uma experiência online com muito conteúdo prático, desafios e hacks onde o conteúdo fica disponível durante uma semana.

---

## Preview do projeto
![AuthPage](https://github.com/davibss/nlw_02/blob/main/preview/login_pag.png)
![HomePage](https://github.com/davibss/nlw_02/blob/main/preview/home_page.png)
![GiveLessons](https://github.com/davibss/nlw_02/blob/main/preview/lessons.png)
![SearchProfs](https://github.com/davibss/nlw_02/blob/main/preview/search_profs.png)

## Como executar o projeto

Este projeto é divido em três partes:
1. Backend (pasta server) 
2. Frontend (pasta web)
3. Mobile (pasta mobile)

Tanto o Frontend quanto o Mobile precisam que o Backend esteja sendo executado para funcionar.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).

#### Rodando o Backend (servidor)

```bash
# Clone este repositório
$ git clone https://github.com/davibss/nlw_02.git
# Acesse a pasta do projeto no terminal/cmd
$ cd nlw_02
# Vá para a pasta server
$ cd server
# Instale as dependências
$ npm install
# Execute a aplicação em modo de desenvolvimento
# Não esqueça de configurar seu banco de dados no arquivo server/knexfile.ts
$ npm run knex:migrate
$ npm run start
# O servidor inciará na porta:3333 - acesse http://localhost:3333 
```

#### Rodando a aplicação web (Frontend)

```bash
# Clone este repositório
$ git clone https://github.com/davibss/nlw_02.git
# Acesse a pasta do projeto no seu terminal/cmd
$ cd nlw_02
# Vá para a pasta da aplicação Front End
$ cd web
# Instale as dependências
$ npm install
# Execute a aplicação em modo de desenvolvimento
$ npm run start
# A aplicação será aberta na porta:3000 - acesse http://localhost:3000
```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Website**  ([React](https://reactjs.org/)  +  [TypeScript](https://www.typescriptlang.org/))
-   **[React Router Dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)**
-   **[Axios](https://github.com/axios/axios)**

#### **Server**  ([NodeJS](https://nodejs.org/en/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[Express](https://expressjs.com/)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[KnexJS](http://knexjs.org/)**
-   **[PostgreSQL](https://www.postgresql.org/)**
-   **[ts-node](https://github.com/TypeStrong/ts-node)**

**Mobile**  ([React Native](http://www.reactnative.com/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[Expo](https://expo.io/)**
-   **[Expo Google Fonts](https://github.com/expo/google-fonts)**
-   **[React Navigation](https://reactnavigation.org/)**
-   **[Axios](https://github.com/axios/axios)**