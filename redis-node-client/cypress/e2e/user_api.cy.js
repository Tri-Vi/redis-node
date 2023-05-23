// USER - API TEST SUITE

describe('User API tests', ()=> {
  it('should make a successful get request', ()=> {
    cy.request('GET', 'http://localhost:8080/api/user')
      .then((response)=>{
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('rows');
        expect(response.body.rows).to.be.an('array').and.to.have.length.gte(0);
      });
  });

  it('should add a user', ()=>{
    const requestBody = {
      first_name: "FIRST NAME - CYPRESS TESTING",
      last_name: "LAST NAME - CYPRESS TESTING",
      email: "EMAIL - CYPRESS TESTING"
    }
    cy.request('POST', 'http://localhost:8080/api/user', requestBody)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('first_name');
        expect(response.body).to.have.property('last_name');
        expect(response.body).to.have.property('email');
        expect(response.body.first_name).to.eq(requestBody.first_name);
        expect(response.body.last_name).to.eq(requestBody.last_name);
        expect(response.body.email).to.eq(requestBody.email);

      })
  });
})