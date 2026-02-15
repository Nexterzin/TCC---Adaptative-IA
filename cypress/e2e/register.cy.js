describe('Autenticacao - Registro', () => {
  beforeEach(() => {
    cy.visit('/PagesRouter/Register');
  });

  const preencherFormulario = ({
    email = 'novo.usuario@teste.com',
    senha = '123456',
    repetirSenha = '123456',
    nome = 'Novo Usuario',
  } = {}) => {
    cy.get('input[type="text"]').eq(0).clear().type(email);
    cy.get('input[type="password"]').eq(0).clear().type(senha);
    cy.get('input[type="password"]').eq(1).clear().type(repetirSenha);
    cy.get('input[type="text"]').eq(1).clear().type(nome);
  };

  it('renderiza formulario de registro', () => {
    cy.contains(/Registre-se/i).should('be.visible');
    cy.contains(/Digite um e-mail/i).should('be.visible');
    cy.contains(/Digite uma senha/i).should('be.visible');
    cy.contains(/Repita sua senha/i).should('be.visible');
    cy.contains(/Como prefere ser chamado\?/i).should('be.visible');
  });

  it('valida campo obrigatorio de nome', () => {
    cy.contains('button', /Avan/i).click();
    cy.contains('Por favor, preencha seu nome.').should('be.visible');
  });

  it('valida divergencia de senha', () => {
    preencherFormulario({ repetirSenha: '654321' });
    cy.contains('button', /Avan/i).click();
    cy.contains('As senhas').should('be.visible');
  });

  it('exibe erro quando API de registro falha', () => {
    cy.intercept('POST', '**/api/usuarios/registrar', {
      statusCode: 409,
      body: { message: 'Email already exists' },
    }).as('registroErro');

    preencherFormulario();
    cy.contains('button', /Avan/i).click();

    cy.wait('@registroErro');
    cy.contains('Email already exists').should('be.visible');
  });

  it('registra usuario com sucesso e volta para login', () => {
    cy.intercept('POST', '**/api/usuarios/registrar', {
      statusCode: 200,
      body: { message: 'Usuario registrado com sucesso!' },
    }).as('registroOk');

    preencherFormulario();
    cy.contains('button', /Avan/i).click();

    cy.wait('@registroOk');
    cy.contains('registrado com sucesso').should('be.visible');
    cy.url({ timeout: 7000 }).should('include', '/PagesRouter/Login');
  });
});
