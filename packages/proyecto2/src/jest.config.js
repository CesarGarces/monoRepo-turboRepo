module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  clearMocks: true, // Limpia automáticamente los mocks
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};