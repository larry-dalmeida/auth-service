import { faker } from "@faker-js/faker";

export const generateMockCredentials = () => {
  const email = faker.internet.exampleEmail({ firstName: faker.person.firstName() });
  const password = faker.internet.password();
  return { email, password };
};
