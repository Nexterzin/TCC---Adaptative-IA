describe('Home - analise de laudo', () => {
  beforeEach(() => {
    cy.visit('/PagesRouter/Home');
  });

  const uploadPdf = (fileName = 'laudo.pdf') => {
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('PDF fake content'),
      fileName,
      mimeType: 'application/pdf',
      lastModified: Date.now(),
    }, { force: true });
  };

  it('renderiza botao de envio do arquivo', () => {
    cy.contains(/Enviar arquivo \(PDF\)/i).should('be.visible');
  });

  it('processa arquivo e mostra resultado com diabetes', () => {
    cy.intercept('POST', '**/api/usuarios/analisar-laudo', {
      statusCode: 200,
      body: { classe: 1, probabilidade: 0.85 },
    }).as('analiseOk');

    uploadPdf();
    cy.contains('Processando seu laudo...').should('be.visible');

    cy.wait('@analiseOk');
    cy.contains(/Diabetes/i).should('be.visible');
    cy.contains('85.0%').should('be.visible');
    cy.contains(/Analisar outro arquivo/i).should('be.visible');
  });

  it('processa arquivo e mostra resultado sem diabetes', () => {
    cy.intercept('POST', '**/api/usuarios/analisar-laudo', {
      statusCode: 200,
      body: { classe: 0, probabilidade: 0.1 },
    }).as('analiseOkSem');

    uploadPdf('laudo-sem-diabetes.pdf');
    cy.wait('@analiseOkSem');

    cy.contains(/Sem diabetes/i).should('be.visible');
    cy.contains('10.0%').should('be.visible');
  });

  it('exibe erro quando API de analise falha', () => {
    cy.intercept('POST', '**/api/usuarios/analisar-laudo', {
      statusCode: 400,
      body: { message: 'Invalid file' },
    }).as('analiseErro');

    uploadPdf('laudo-invalido.pdf');
    cy.wait('@analiseErro');

    cy.contains(/Erro ao processar o laudo/i).should('be.visible');
  });

  it('permite reiniciar a tela para analisar outro arquivo', () => {
    cy.intercept('POST', '**/api/usuarios/analisar-laudo', {
      statusCode: 200,
      body: { classe: 1, probabilidade: 0.88 },
    }).as('analiseOk');

    uploadPdf('laudo-reset.pdf');
    cy.wait('@analiseOk');
    cy.contains(/Analisar outro arquivo/i).click();

    cy.contains(/Enviar arquivo \(PDF\)/i).should('be.visible');
    cy.contains(/Diabetes/i).should('not.exist');
  });
});
