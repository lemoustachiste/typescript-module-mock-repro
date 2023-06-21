module.exports = {
  testEnvironment: 'jsdom',
  modulePaths: [
    '<rootDir>/src/',
    '<rootDir>/node_modules'
  ],
  transform: {
    '^.+\\.(ts)$': 'ts-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@polymer|lit-html)/)'
  ]
};
