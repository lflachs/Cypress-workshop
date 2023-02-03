/// <reference types="cypress" />

import { generateFakeUser } from "../fixtures/user";
import axios from "axios";

describe("Authentication", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
  });
  before(() => {
    cy.exec("npm run db:seed");
    axios.post(`${Cypress.env("apiUrl")}/testData/seed`);
  });
  it("User should be able to login", () => {
    cy.login("Bob_smith", "s3cret");
  });
  it("User should not be able to login with wrong credentials", () => {
    cy.intercept("POST", "/login").as("login");

    // We visit the signin page
    cy.visit("/signin");

    // We fill the form
    cy.get("input[name=username]").type("Bob_smith");
    cy.get("input[name=password]").type("wrong_password");
    cy.get("button[type=submit]").click();

    // We wait for the request to finish
    cy.wait("@login");
    cy.get("@login").its("response.statusCode").should("eq", 401);

    // We check that we are still on the signin page
    cy.location("pathname").should("equal", "/signin");

    // We check that we see the error message text
    cy.contains(".MuiAlert-message", "Username or password is invalid");
  });
  it("You should not be able to access the app without being logged in", () => {
    cy.visit("/bankaccounts");
    cy.location("pathname").should("equal", "/signin");
    cy.visit("/user/settings");
    cy.location("pathname").should("equal", "/signin");
  });
  it("User should be able to signup", () => {
    const user = generateFakeUser();
    cy.signup(user);
  });
  it("New user should see the onboarding on login and have no money", () => {
    const user = generateFakeUser();
    cy.signup(user);
    cy.login(user.username, user.password);
    cy.onboarding();
    cy.get('[data-test="sidenav-user-full-name"]').should(
      "have.text",
      `${user.firstName} ${user.lastName[0]}`
    );
    cy.get('[data-test="sidenav-username"]').should("have.text", `@${user.username}`);

    cy.get('[data-test="sidenav-user-balance"]').should("have.text", "$0.00");
  });
});
