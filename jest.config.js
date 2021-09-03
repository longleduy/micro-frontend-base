// eslint-disable-next-line @typescript-eslint/no-var-requires
const base = require('./jestconfig.base');

module.exports = {
  ...base,
  projects: ['<rootDir>/packages/*/jest.config.js'],
  coverageDirectory: '<rootDir>/coverage/',
};
