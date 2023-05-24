// BOOK - API TEST Suite

describe('Book  API tests', () => {
  it('should make a successful get request', () => {
    cy.request('GET', 'http://localhost:8080/api/book')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('rows');
        expect(response.body.rows).to.be.an('array').and.to.have.length.gte(0);
      });
  });

  it('should add a book', ()=>{
    const requestBody = {
      name: 'NEW BOOK - CYPRESS TESTING'
    }
    cy.request('POST', 'http://localhost:8080/api/book', requestBody)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.eq(requestBody.name);
      })
  })

  
  // it('should update an existing book', ()=>{
  //   const resourceId = 1;
  //   const requestBody = {
  //     name: 'Updated Book - CYPRESS TESTING'
  //   }
  //   cy.request('PUT', 'http://localhost:8080/api/book/${resourceId}',requestBody)
  //     .then((response)=>{
  //       expect(response.status).to.eq(200);
  //       expect(response.body).to.have.property('id');
  //       expect(response.body).to.have.property('name');
  //       expect(response.body.id).to.eq(resourceId);
  //       expect(response.body.name).to.eq(requestBody.name);
  //     })
  // })
});