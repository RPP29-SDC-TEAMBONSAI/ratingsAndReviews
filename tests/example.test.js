// uses sum from example.js and runs a test
const { sum, concat } = require('../client/src/jest-example/example');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('concatenates 3 words', () => {
  expect(concat('cow', 'said', 'moooo')).toMatch('cow said moooo');
});



