/// <reference types="cypress" />
import axios from "axios";
const payment = {
  amount: "10.00",
  description: "Test transaction",
};

describe("Transactions", () => {
  before(() => {
    cy.exec("npm run db:seed");
    axios.post(`${Cypress.env("apiUrl")}/testData/seed`);
  });
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
  });
  it("User should be able to send a transaction", () => {
    cy.intercept("POST", "/transactions").as("transactions");
    cy.login("Bob_smith", "s3cret");

    cy.get('[data-test="nav-top-new-transaction"]').click();
    cy.get('[data-test="user-list-search-input"]').type("Alice");
    cy.get(
      '[data-test="users-list"] > :nth-child(1) > .MuiListItemText-root > .MuiListItemText-primary'
    ).should("have.text", "Alice Smith");
    cy.get(
      '[data-test="users-list"] > :nth-child(1) > .MuiListItemText-root > .MuiListItemText-primary'
    ).click();

    cy.get("#amount").type(payment.amount);
    cy.get("#transaction-create-description-input").type(payment.description);

    cy.get('[data-test="transaction-create-submit-payment"]').click();
    cy.wait("@transactions");
    cy.get("@transactions").its("response.statusCode").should("eq", 200);
    cy.get('[data-testid="message-transaction"]').should(
      "have.text",
      `Paid $${payment.amount} for ${payment.description}`
    );
  });
  it("User should receive a transaction", () => {
    cy.login("Alice_smith", "s3cret");
    cy.get('[data-test="sidenav-user-balance"]').should("have.text", "$20.00");
  });
});
