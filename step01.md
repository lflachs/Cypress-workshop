# Step 01

## Welcome!

You just got hired in a new company as the new Frontend Developer. The company has created a system that allow people to send and receive money between each other.

Your boss just gave you access to the repository, it's time to do the tour of the application to discover the APP.

## Your task

Take a few minutes to look at the application. After installing the Application, run `yarn dev` to start it and start exploring the functionnality of the Application.

List all the functionnality of the Application that you see inside the following table:

| Functionnality Name | Observation                                                                                                                                                                                                                                             | Business critical |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Login               | When a user type his/her username and password, he is redirected into his/her account.                                                                                                                                                                  | **Yes**           |
| Signup              | When a user type his/her firstname, lastname, username and password and click on Signup, an account should be created for the user and the user should be able to log in with the new account.                                                          | **Yes**           |
| onboarding          | When a user has just created a new account, he/she should see a onboarding window which he can interract with by clicking on "next".<br /><br />The user is then Prompt to fill his/her Bank account details.<br />Then the user should see a last step | **Yes**           |
| Send Payment        | When a user clicks on the button "New", search for a user, type an amount and a note and click on "Pay", the amount should be sent to the user.                                                                                                         | **Yes**           |
| Account             | When a user clicks on "My account" he/she should be able to modify the information from his/her profile.                                                                                                                                                | **No**            |
| Bank Account        | When a user clicks on "Bank Account" he/she should be able to add or remove a bank Account                                                                                                                                                              | **Yes**           |
| Notification        | When a user receives a Payment, he/she should see a notification and should be able to access the notification through the menu on the navbar or on the left pannel. When clicking on "Dismiss", the notification must disappear.                       | **No**            |
| Feed                | All transaction should be visible inside the Feed. When a user uses the filter, he/she should be able to filter the transaction for a certain time period.<br />                                                                                        | **No**            |
| Balance             | A user should be able to see the balance of his/her account on the left menu.                                                                                                                                                                           | **Yes**           |
| Logout              | A user should be able to logout by clicking on the logout button.                                                                                                                                                                                       | **Yes**           |
