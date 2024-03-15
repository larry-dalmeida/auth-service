import { faker } from "@faker-js/faker";

export const generateMockCredentials = () => {
  const name = faker.person.firstName();
  const email = faker.internet.exampleEmail({ firstName: name });
  const password = faker.internet.password();
  return { name, email, password };
};
