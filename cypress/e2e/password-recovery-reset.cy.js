describe('Autenticacao - Recuperacao e reset de senha', () => {
  describe('Recuperacao', () => {
    beforeEach(() => {
      cy.visit('/PagesRouter/Password-recovery');
    });

    it('renderiza formulario de recuperacao', () => {
      cy.get('input[placeholder="Insira seu E-mail"]').should('be.visible');
      cy.contains('button', /Avan/i).should('be.visible');
    });

    it('valida email obrigatorio', () => {
      cy.contains('button', /Avan/i).click();
      cy.contains(/Favor inserir email para envio de recuper/i).should('be.visible');
    });

    it('exibe erro quando API de recuperacao falha', () => {
      cy.intercept('POST', '**/api/usuarios/recuperar-senha', {
        statusCode: 404,
        body: { message: 'Email not found' },
      }).as('recuperacaoErro');

      cy.get('input[placeholder="Insira seu E-mail"]').type('naoexiste@teste.com');
      cy.contains('button', /Avan/i).click();

      cy.wait('@recuperacaoErro');
      cy.contains('Email not found').should('be.visible');
    });

    it('envia recuperacao com sucesso e retorna para login', () => {
      cy.intercept('POST', '**/api/usuarios/recuperar-senha', {
        statusCode: 200,
        body: {},
      }).as('recuperacaoOk');

      cy.get('input[placeholder="Insira seu E-mail"]').type('usuario@teste.com');
      cy.contains('button', /Avan/i).click();

      cy.wait('@recuperacaoOk');
      cy.contains(/E-mail de recuper.*senha enviado/i).should('be.visible');
      cy.url({ timeout: 7000 }).should('include', '/PagesRouter/Login');
    });
  });

  describe('Reset de senha', () => {
    beforeEach(() => {
      cy.visit('/reset-password?token=token-teste');
    });

    it('renderiza formulario de reset', () => {
      cy.contains(/Redefinir Senha/i).should('be.visible');
      cy.get('input[placeholder="Digite a nova senha"]').should('be.visible');
      cy.contains('button', /Confirmar/i).should('be.visible');
    });

    it('exibe erro no reset quando API falha', () => {
      cy.intercept('POST', '**/api/usuarios/resetar-senha', {
        statusCode: 400,
        body: { message: 'Erro ao alterar senha!' },
      }).as('resetErro');

      cy.get('input[placeholder="Digite a nova senha"]').type('novaSenha123');
      cy.contains('button', /Confirmar/i).click();

      cy.wait('@resetErro');
      cy.contains('Erro ao alterar senha!').should('be.visible');
    });

    it('reseta senha com sucesso e redireciona para login', () => {
      cy.intercept('POST', '**/api/usuarios/resetar-senha', {
        statusCode: 200,
        body: {},
      }).as('resetOk');

      cy.get('input[placeholder="Digite a nova senha"]').type('novaSenha123');
      cy.contains('button', /Confirmar/i).click();

      cy.wait('@resetOk');
      cy.contains('Nova senha cadastrada!').should('be.visible');
      cy.url({ timeout: 7000 }).should('include', '/PagesRouter/Login');
    });
  });
});
