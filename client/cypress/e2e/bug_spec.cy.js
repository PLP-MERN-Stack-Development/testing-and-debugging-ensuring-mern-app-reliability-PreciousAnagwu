describe('Bug tracker end-to-end', () => {
  it('creates and resolves a bug', () => {
    cy.visit('/');
    cy.get('input[placeholder="Title"]').type('E2E bug');
    cy.get('textarea[placeholder="Description"]').type('desc');
    cy.contains('Report Bug').click();

    cy.contains('E2E bug').should('exist');
    cy.contains('Resolve').click();
    cy.contains('Reopen').should('exist');
    cy.contains('Delete').click();
    cy.contains('E2E bug').should('not.exist');
  });
});
