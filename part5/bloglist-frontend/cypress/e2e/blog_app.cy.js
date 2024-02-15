describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Test User',
      username: 'tuser',
      password: 'secret',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button').contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('tuser')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('tuser logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('tuser')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'tuser', password: 'secret' })
      })

      it('A blog can be created', function () {
        cy.contains('new blog').click()
        cy.get('#title').type('Everyone loves Raymond')
        cy.get('#author').type('Ray Romano')
        cy.get('#url').type('https://www.imdb.com/title/tt0115167/')
        cy.get('#create-button').click()

        cy.contains('Everyone loves Raymond')
      })
    })
  })
})
