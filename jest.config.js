/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  rootDir: './',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  moduleDirectories: ['node_modules', 'src', 'test'],
  moduleNameMapper: {
    '\\.module\\.(css|less|scss|sss|styl)$': 'identity-obj-proxy',
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/test/__mocks__/styleMock.js',
    '@/(.*)': '<rootDir>/src/$1',
    '^.+\\.(png|jpg|svg)$': '<rootDir>/test/__mocks__/fileMock.js',
  },
};
