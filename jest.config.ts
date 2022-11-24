import { Config } from 'jest'

const jestConfig: Config = {
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageProvider: 'v8',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  transform: {
    '^.+\\.(t|j)s?$': '@swc/jest'
  },
  coveragePathIgnorePatterns: [
    'contracts',
    '<rootDir>/src/infra/http/rest',
    '<rootDir>/src/domain/repositories',
    'index.ts'
  ],
  clearMocks: true
}

export default jestConfig
