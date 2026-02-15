describe('Sistema completo - E2E', () => {
  describe('Login e navegacao', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('renderiza tela de login', () => {
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

    it('faz login com erro', () => {
      cy.intercept('POST', '**/api/usuarios/login', {
        statusCode: 401,
        body: 'Email ou senha invalidos',
      }).as('loginErro');

      cy.get('input[placeholder="Insira seu E-mail"]').type('erro@teste.com');
      cy.get('input[placeholder="Insira sua Senha"]').type('senhaerrada');
      cy.contains('button', /Avan/i).click();

      cy.wait('@loginErro');
      cy.contains(/Email ou senha/i).should('be.visible');
    });

    it('faz login com sucesso', () => {
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

  describe('Registro', () => {
    beforeEach(() => {
      cy.visit('/PagesRouter/Register');
    });

    const preencherRegistro = ({
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

    it('renderiza tela de registro', () => {
      cy.contains(/Registre-se/i).should('be.visible');
      cy.contains(/Digite um e-mail/i).should('be.visible');
      cy.contains(/Digite uma senha/i).should('be.visible');
      cy.contains(/Repita sua senha/i).should('be.visible');
      cy.contains(/Como prefere ser chamado\?/i).should('be.visible');
    });

    it('valida campos obrigatorios', () => {
      cy.contains('button', /Avan/i).click();
      cy.contains('Por favor, preencha seu nome.').should('be.visible');
    });

    it('valida senha divergente', () => {
      preencherRegistro({ repetirSenha: '654321' });
      cy.contains('button', /Avan/i).click();
      cy.contains('As senhas').should('be.visible');
    });

    it('trata erro da API de registro', () => {
      cy.intercept('POST', '**/api/usuarios/registrar', {
        statusCode: 409,
        body: { message: 'Email already exists' },
      }).as('registroErro');

      preencherRegistro();
      cy.contains('button', /Avan/i).click();

      cy.wait('@registroErro');
      cy.contains('Email already exists').should('be.visible');
    });

    it('registra com sucesso', () => {
      cy.intercept('POST', '**/api/usuarios/registrar', {
        statusCode: 200,
        body: { message: 'Usuario registrado com sucesso!' },
      }).as('registroOk');

      preencherRegistro();
      cy.contains('button', /Avan/i).click();

      cy.wait('@registroOk');
      cy.contains(/registrado com sucesso/i).should('be.visible');
      cy.url({ timeout: 7000 }).should('include', '/PagesRouter/Login');
    });
  });

  describe('Recuperacao e reset de senha', () => {
    it('valida recuperacao com campo vazio', () => {
      cy.visit('/PagesRouter/Password-recovery');
      cy.contains('button', /Avan/i).click();
      cy.contains(/Favor inserir email para envio de recuper/i).should('be.visible');
    });

    it('recupera senha com sucesso', () => {
      cy.intercept('POST', '**/api/usuarios/recuperar-senha', {
        statusCode: 200,
        body: {},
      }).as('recuperacaoOk');

      cy.visit('/PagesRouter/Password-recovery');
      cy.get('input[placeholder="Insira seu E-mail"]').type('usuario@teste.com');
      cy.contains('button', /Avan/i).click();

      cy.wait('@recuperacaoOk');
      cy.contains(/E-mail de recuper.*senha enviado/i).should('be.visible');
      cy.url({ timeout: 7000 }).should('include', '/PagesRouter/Login');
    });

    it('reseta senha com erro', () => {
      cy.intercept('POST', '**/api/usuarios/resetar-senha', {
        statusCode: 400,
        body: { message: 'Erro ao alterar senha!' },
      }).as('resetErro');

      cy.visit('/reset-password?token=token-teste');
      cy.get('input[placeholder="Digite a nova senha"]').type('novaSenha123');
      cy.contains('button', /Confirmar/i).click();

      cy.wait('@resetErro');
      cy.contains('Erro ao alterar senha!').should('be.visible');
    });

    it('reseta senha com sucesso', () => {
      cy.intercept('POST', '**/api/usuarios/resetar-senha', {
        statusCode: 200,
        body: {},
      }).as('resetOk');

      cy.visit('/reset-password?token=token-teste');
      cy.get('input[placeholder="Digite a nova senha"]').type('novaSenha123');
      cy.contains('button', /Confirmar/i).click();

      cy.wait('@resetOk');
      cy.contains('Nova senha cadastrada!').should('be.visible');
      cy.url({ timeout: 7000 }).should('include', '/PagesRouter/Login');
    });
  });

  describe('Home - envio e analise de laudo', () => {
    const uploadPdf = (fileName = 'laudo.pdf') => {
      cy.get('input[type="file"]').selectFile({
        contents: Cypress.Buffer.from('PDF fake content'),
        fileName,
        mimeType: 'application/pdf',
        lastModified: Date.now(),
      }, { force: true });
    };

    beforeEach(() => {
      cy.visit('/PagesRouter/Home');
    });

    it('renderiza botao de envio', () => {
      cy.contains(/Enviar arquivo \(PDF\)/i).should('be.visible');
    });

    it('analisa laudo com resultado diabetes', () => {
      cy.intercept('POST', '**/api/usuarios/analisar-laudo', {
        statusCode: 200,
        body: { classe: 1, probabilidade: 0.85 },
      }).as('analiseOk');

      uploadPdf();
      cy.contains('Processando seu laudo...').should('be.visible');
      cy.wait('@analiseOk');
      cy.contains(/Diabetes/i).should('be.visible');
      cy.contains('85.0%').should('be.visible');
    });

    it('analisa laudo com resultado sem diabetes', () => {
      cy.intercept('POST', '**/api/usuarios/analisar-laudo', {
        statusCode: 200,
        body: { classe: 0, probabilidade: 0.1 },
      }).as('analiseSem');

      uploadPdf('laudo-sem-diabetes.pdf');
      cy.wait('@analiseSem');
      cy.contains(/Sem diabetes/i).should('be.visible');
      cy.contains('10.0%').should('be.visible');
    });

    it('trata erro na analise do laudo', () => {
      cy.intercept('POST', '**/api/usuarios/analisar-laudo', {
        statusCode: 400,
        body: { message: 'Invalid file' },
      }).as('analiseErro');

      uploadPdf('laudo-invalido.pdf');
      cy.wait('@analiseErro');
      cy.contains(/Erro ao processar o laudo/i).should('be.visible');
    });
  });
});
