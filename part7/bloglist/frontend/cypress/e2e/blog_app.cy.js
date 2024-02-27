describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Test User",
      username: "tuser",
      password: "secret",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.get("#username");
    cy.get("#password");
    cy.get("#login-button").contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("tuser");
      cy.get("#password").type("secret");
      cy.get("#login-button").click();

      cy.contains("tuser logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("tuser");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error").contains("Wrong username or password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });

    describe("When logged in", function () {
      beforeEach(function () {
        cy.login({ username: "tuser", password: "secret" });
      });

      it("A blog can be created", function () {
        cy.contains("new blog").click();
        cy.get("#title").type("Everyone loves Raymond");
        cy.get("#author").type("Ray Romano");
        cy.get("#url").type("https://www.imdb.com/title/tt0115167/");
        cy.get("#create-button").click();

        cy.contains("Everyone loves Raymond");
      });

      it("A blog can be liked", function () {
        cy.createBlog({
          title: "Everyone loves Raymond",
          author: "Ray Romano",
          url: "https://www.imdb.com/title/tt0115167/",
        });

        cy.contains("view").click();
        cy.contains("like").click();
        cy.contains("likes 1");
      });

      it("A blog can be deleted by the user who created it", function () {
        cy.createBlog({
          title: "Everyone loves Raymond",
          author: "Ray Romano",
          url: "https://www.imdb.com/title/tt0115167/",
        });

        cy.contains("view").click();
        cy.contains("remove").click();
        cy.get(".success").contains(
          // eslint-disable-next-line quotes
          "Blog 'Everyone loves Raymond' removed successfully.",
        );
      });

      it("A blog cannot be deleted by another user", function () {
        cy.createBlog({
          title: "Everyone loves Raymond",
          author: "Ray Romano",
          url: "https://www.imdb.com/title/tt0115167/",
        });

        cy.contains("logout").click();

        const user = {
          name: "Another User",
          username: "auser",
          password: "secret",
        };
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);

        cy.login({ username: "auser", password: "secret" });

        cy.contains("view").click();
        cy.get(".blog").should("not.contain", "remove");
      });

      it("Blogs are ordered by likes", function () {
        cy.createBlog({
          title: "Everyone loves Raymond",
          author: "Ray Romano",
          url: "https://www.imdb.com/title/tt0115167/",
        });
        cy.createBlog({
          title: "The Big Bang Theory",
          author: "Chuck Lorre",
          url: "https://www.imdb.com/title/tt0898266/",
        });

        cy.contains("The Big Bang Theory").contains("view").click();
        cy.contains("The Big Bang Theory").contains("like").click();
        cy.contains("The Big Bang Theory").contains("like").click();
        cy.contains("The Big Bang Theory").contains("like").click();

        cy.reload();

        cy.get(".blog").eq(0).contains("The Big Bang Theory");
        cy.get(".blog").eq(1).contains("Everyone loves Raymond");
      });
    });
  });
});
