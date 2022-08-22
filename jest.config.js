module.exports = {
  clearMocks: true,
  resetModules: true,
  verbose: true,
  coverageReporters: ['text'],
  modulePathIgnorePatterns: ['./dist'],
  testMatch: ['**/?(*.)+(test).+(ts)'],
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__mocks__/',
    '.?.min.js'
  ],
  coverageThreshold: {
    global: {
      // lines: 80,
      // statements: 80,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts'],
  testEnvironment: 'node',
  setupFilesAfterEnv: [],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};

