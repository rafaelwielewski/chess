module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  setupFiles: ['dotenv/config', 'jest-localstorage-mock',
    '<rootDir>/src/test/setupTests.ts'
  ],
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  },
  // testSequencer: '<rootDir>/src/test/testSequencer.js',
  testTimeout: 30000
};
