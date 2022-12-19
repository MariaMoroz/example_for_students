/// <reference types="cypress" />

describe('My First Test', () => {

  beforeEach(() => {
    cy.visit('https://example.cypress.io/')
  })

  it('clicking "type" navigates to a new url', () => {
    cy.contains('Next').click()
    cy.url().should('include', '/commands/traversal')
  })

  it('clicking "root" navigates to a new url', () => {
    cy.contains('root').click()
  })
})
