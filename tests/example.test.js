// uses sum from example.js and runs a test
const sum = require('../client/src/jest-example/example');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});