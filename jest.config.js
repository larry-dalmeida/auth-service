/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.spec.ts"],
  collectCoverage: true,
  coverageDirectory: "coverage/unit",
};
