describe('testing the test', () => {
  it('passes', () => {
    cy.visit('http://localhost:19006')
    .contains('Let\'s find us a SQUAD!')
  })
})