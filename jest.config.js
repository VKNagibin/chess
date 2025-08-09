/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  rootDir: './',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.module\\.(css|less|scss|sss|styl)$': 'identity-obj-proxy',
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/__mocks__/styleMock.js',
    '@/(.*)': '<rootDir>/src/$1',
    '^.+\\.(png|jpg|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
