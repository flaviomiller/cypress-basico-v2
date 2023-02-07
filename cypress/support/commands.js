Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Flavio')
    cy.get('#lastName').type('Miller')
    cy.get('#email').type('flaviomiller@teste.com')
    cy.get('#open-text-area').type('Hello World')
    cy.get('button[type="submit"]').click()
 })