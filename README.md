<h1  style="color: #6320EE"><b>API Users</b></h1>

API REST para gerenciamento de usuários com base de dados MySQL. A API também conta com sistema de autenticação de usuário via JWT e recuperação de senha.

<h2><b>Endpoints</b></h2>

* ### **GET**

    **/users ->** Lista todos os usuário registrados na base de dados.

    **/user/:id ->** Lista as informações de um usuário específico com base no ID.
    
    - **Parâmetros**<br/>
        - id: identificador do usuário

    <br/>

    <hr>

* ### **POST**

    **/user ->** Cria um usuário na base de dados **(Rota restrita)**.

    - **Body (JSON)**<br/>
        - name: nome do usuário;
        - email: email do usuário;
        - password: senha do usuário.

    <br/>

    **/recoverpassword ->** Gera um código UUID para ser utilizado em uma rota de recuperação de senha.

    - **Body (JSON)**<br/>
        - email: email de um usuário existente.

    <br/>

    **/changepassword ->** Recebe o código gerado pela rota '/recoverpassword' para realizar a recuperação da senha.

    - **Body (JSON)**<br/>
        - token: UUID gerado na rota de recuperação de senha;
        - pasword: nova senha do usuário.

    <br/>

    **/login ->** Realiza a autenticação por meio de um JWT para que o usuário possa acessar as rotas restritas.

    - **Body (JSON)**<br/>
        - email: email de um usuário existente;
        - password: senha do usuário.

    <br/>

    <hr/>

* ### **PUT**

    **/user ->** Edita um usuário da base de dados **(Rota restrita)**.

    - **Body (JSON)**<br/>
        - id: Identificador do usuário a ser editado;
        - name: Nome atualizado do usuário;
        - email: Email atualizado do usuário;
        - role: Novo cargo do usuário.

    <br/>

    <hr/>
* ### **DELETE**

    **/user ->** Remove um usuário da base de dados **(Rota restrita)**.

    - **Parâmetros**<br/>
        - id: identificador do usuário a ser removido.

    <br/>