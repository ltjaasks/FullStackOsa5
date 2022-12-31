describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        username: 'testaaja',
        name: 'late j',
        password: 'salaisuus'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.visit('http://localhost:3000')
      cy.contains('Log in to application')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('testaaja')
            cy.get('#password').type('salaisuus')
            cy.get('#loginButton').click()

            cy.contains('late j logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('virhe')
            cy.get('#password').type('virhe')
            cy.get('#loginButton').click()

            cy.contains('Wrong username or password')
        })
      })

    describe('logged in user performs actions', function() {
        beforeEach(function() {
            cy.login({ username: 'testaaja', password: 'salaisuus' })
            cy.createBlog({
                title: 'Cypress test',
                author: 'late j',
                url: 'joku.urli'
            })
        })

        it('blogs can be liked', function () {
            cy.contains('Cypress test late j')
            cy.contains('view').click()
            cy.contains('likes 0')
            cy.contains('like').click()
            cy.contains('likes 1')
        })

        it('blogs creator can delete blog', function () {
            cy.contains('Cypress test late j')
            cy.contains('view').click()
            cy.contains('remove').click()
            cy.contains('Cypress test late j').should('not.exist')
        })

        it('blogs are arranged by likes', function () {
            cy.createBlog({
                title: 'eka',
                author: 'late j',
                url: 'joku'
            })
            cy.createBlog({
                title: 'toka',
                author: 'late j',
                url: 'joku'
            })
            cy.contains('eka').contains('view').click()
            cy.contains('like').click()
            cy.contains('likes 1')
            cy.contains('like').click()
            cy.contains('likes 2')
            cy.contains('hide').click()

            cy.contains('toka').contains('view').click()
            cy.contains('like').click()
            cy.contains('hide').click()

            cy.get('.aBlog').eq(0).should('contain', 'eka')
            cy.get('.aBlog').eq(1).should('contain', 'toka')
            cy.get('.aBlog').eq(2).should('contain', 'Cypress test')
        })
    })
  })