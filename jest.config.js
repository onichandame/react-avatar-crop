const path = require('path')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    path.resolve(__dirname, 'jest.setup.ts')
  ]
};
