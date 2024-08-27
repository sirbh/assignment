export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    // testMatch: ['**/src/**/*.test.(ts|tsx)'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform"
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.app.json',
      },
    },
    // moduleNameMapper: {
    //   "\\.(css|less|sass|scss)$": "jest-css-modules-transform",
    // },
  };