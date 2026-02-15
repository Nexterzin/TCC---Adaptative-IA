describe('Autenticacao - Login e navegacao', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renderiza formulario de login', () => {
    cy.get('input[placeholder="Insira seu E-mail"]').should('be.visible');
    cy.get('input[placeholder="Insira sua Senha"]').should('be.visible');
    cy.contains('button', /Avan/i).should('be.visible');
  });

  it('navega para registro', () => {
    cy.contains('button', /Registre-se/i).click();
    cy.url({ timeout: 5000 }).should('include', '/PagesRouter/Register');
  });

  it('navega para recuperacao de senha', () => {
    cy.contains('button', /Esqueceu sua senha\?/i).click();
    cy.url({ timeout: 5000 }).should('include', '/PagesRouter/Password-recovery');
  });

  it('exibe erro no login quando API retorna falha', () => {
    cy.intercept('POST', '**/api/usuarios/login', {
      statusCode: 401,
      body: 'Email ou senha invalidos',
    }).as('loginErro');

    cy.get('input[placeholder="Insira seu E-mail"]').type('erro@teste.com');
    cy.get('input[placeholder="Insira sua Senha"]').type('senhaerrada');
    cy.contains('button', /Avan/i).click();

    cy.wait('@loginErro');
    cy.contains(/Email ou senha/i).should('be.visible');
    cy.url().should('not.include', '/PagesRouter/Home');
  });

  it('realiza login com sucesso e redireciona para home', () => {
    cy.intercept('POST', '**/api/usuarios/login', {
      statusCode: 200,
      body: { token: 'fake-token' },
    }).as('loginOk');

    cy.get('input[placeholder="Insira seu E-mail"]').type('usuario@teste.com');
    cy.get('input[placeholder="Insira sua Senha"]').type('123456');
    cy.contains('button', /Avan/i).click();

    cy.wait('@loginOk');
    cy.contains(/logado com sucesso/i).should('be.visible');
    cy.url({ timeout: 5000 }).should('include', '/PagesRouter/Home');
  });
});
