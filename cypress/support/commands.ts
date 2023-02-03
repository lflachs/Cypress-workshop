declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): void;
    signup(user: { firstName: string; lastName: string; username: string; password: string }): void;
    onboarding(): void;
  }
}

Cypress.Commands.add("login", (username, pw) => {
  cy.intercept("POST", "/login").as("login");
  // We visit the signin page
  cy.visit("/signin");

  // We fill the form
  cy.get("input[name=username]").type(username);
  cy.get("input[name=password]").type(pw);
  cy.get("button[type=submit]").click();

  // We wait for the request to finish
  cy.wait("@login").its("response.statusCode").should("eq", 200);

  // We check that we are redirected to the home pages
  cy.location("pathname").should("equal", "/");
});

Cypress.Commands.add("signup", (user) => {
  cy.intercept("POST", "/users").as("create_user");

  cy.visit("/signup");
  cy.get("input[name=firstName]").type(user.firstName);
  cy.get("input[name=lastName]").type(user.lastName);
  cy.get("input[name=username]").type(user.username);
  cy.get("input[name=password]").type(user.password);
  cy.get("input[name=confirmPassword]").type(user.password);
  cy.get("button[type=submit]").click();

  cy.wait("@create_user");
  cy.get("@create_user").its("response.statusCode").should("eq", 201);

  cy.location("pathname").should("equal", "/signin");
});

Cypress.Commands.add("onboarding", () => {
  cy.get(".MuiDialog-container").should("be.visible");
  cy.get('[data-test="user-onboarding-next"] > .MuiButton-label').click();

  cy.get("#bankaccount-bankName-input").type("Bank of America");
  cy.get("#bankaccount-routingNumber-input").type("123456789");
  cy.get("#bankaccount-accountNumber-input").type("123456789");

  cy.get('[data-test="bankaccount-submit"]').click();
  cy.get('[data-test="user-onboarding-next"] > .MuiButton-label').click();
});
