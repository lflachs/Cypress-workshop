import { faker } from "@faker-js/faker";

export const janeSmith = {
  firstName: "Jane",
  lastName: "Smith",
  username: "Jane_smith",
  password: "s3cret",
};

export const generateFakeUser = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.internet.userName(),
    password: "s3cret",
  };
};
