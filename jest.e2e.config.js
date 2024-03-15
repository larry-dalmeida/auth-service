/** @type {import('ts-jest').JestConfigWithTsJest} */
const baseConfig = require('./jest.config');
module.exports = {
  ...baseConfig,
  testMatch: ['**/e2e/**/*.test.ts'],
  coverageDirectory: 'coverage/e2e'
};