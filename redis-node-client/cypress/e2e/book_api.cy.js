// Get Book
describe('API tests', () => {
  it('should make a successful API request', () => {
    cy.request('GET', 'http://localhost:8080/api/book')
      .then((response) => {
        expect(response.status).to.eq(200);
        //expect(response.body).to.have.property('data');
      });
  });
});