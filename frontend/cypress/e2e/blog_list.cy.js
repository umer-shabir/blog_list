describe('BLog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('Blogs')
    cy.contains('Login').click()

    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-btn').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-btn').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')

      cy.contains('Matti Luukkainen logged in').should('not.exist')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('Create new blog').click()
      cy.get('input[placeholder=\'Write blog title\']').type('test blog with cypress')
      cy.get('input[placeholder=\'Write blog author\']').type('cpyress')
      cy.get('input[placeholder=\'Write blog url\']').type('https://www.cypress.io/')
      cy.get('#create').click()

      cy.contains('test blog with cypress')
    })

    describe('and several blogs exisits', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'test blog 1', author: 'test author 1', url: 'www.test1.com' })
        cy.createBlog({ title: 'test blog 2', author: 'test author 2', url: 'www.test2.com' })
        cy.createBlog({ title: 'test blog 3', author: 'test author 3', url: 'www.test3.com' })
      })

      it('user can like a blog', function () {
        cy.contains('test blog 2').parent().find('button').click()
        cy.get('#like-btn').click().wait(500).click()

        cy.contains('Likes 2')
      })
    })
  })
})
