/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  this.beforeEach(function(){
    cy.visit('./src/index.html')
  })
  it('1. verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('2. preenche os blocos obrigatóris e envia o formulário', function() {
    const longText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'

    cy.get('#firstName').type('Flavio')
    cy.get('#lastName').type('Miller')
    cy.get('#email').type('flaviomiller@teste.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('3. exibe mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', function () {
    cy.get('#firstName').type('Flavio')
    cy.get('#lastName').type('Miller')
    cy.get('#email').type('flaviomiller,teste.com')
    cy.get('#open-text-area').type('Hello World')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('4. campo telefone se mantém vazio quando preenchido com valor não numérico', function () {
    cy.get('#phone')
    .type('abcdefgh')
    .should('have.value', '')
  })

  it('5. exibe mensagem de erro ao não preencher campo telefone após flegar box telefone como contato preferencial', function () {
    cy.get('#firstName').type('Flavio')
    cy.get('#lastName').type('Miller')
    cy.get('#email').type('flaviomiller@teste.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Hello World')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('6. preenche e limpa o campos nome, sobrenome, e-mail e telefone', function () {
    cy.get('#firstName')
    .type('Flavio')
    .should('have.value', 'Flavio')
    .clear()
    .should('have.value', '')

    cy.get('#lastName')
    .type('Miller')
    .should('have.value', 'Miller')
    .clear()
    .should('have.value', '')

    cy.get('#email')
    .type('flaviomiller@teste.com')
    .should('have.value', 'flaviomiller@teste.com')
    .clear()
    .should('have.value', '')

    cy.get('#phone')
    .type('11989086514')
    .should('have.value', '11989086514')
    .clear()
    .should('have.value', '')
  })

  it('7. exibir mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('8. envia o formulário com sucesso usando um comando customizado', function () {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('9. seleciona um produto (YouTube) por seu texto', function () {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('10. seleciona um produto (Mentoria) por seu valor', function () {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('11. seleciona um produto (Blog) por seu índice', function () {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('12. marca o tipo de atendimento feedback', function () {
    cy.get('input[type="radio"][value="feedback"]').check()
    .should('have.value', 'feedback')
  })

  it('13. marca o tipo de atendimento feedback', function () {
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each (function($radio){
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

  it('14. marca ambos checkboxes, depois desmarca o último', function () {
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
  })

  it('15. seleciona um arquivo da pasta fixtures', function () {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('16. seleciona um arquivo simulando drag-and-drop', function () {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function($input){
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('17. seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
  })

  it('18. verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('19. acessa a página de política de privacidade removendo o target e então clicando no link', function () {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    
    cy.contains('Talking About Testing').should('be.visible')
  })
})
