// uses sum from example.js and runs a test
const {sum, concat} = require('../client/src/jest-example/example');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

<<<<<<< HEAD
test('concatenates 3 words', () => {
  expect(concat('cow', 'said', 'moooo')).toBe('cow said moooo');
})
=======


//OVERVIEW TESTS
//  unit tests:
//   1. does index render?
//   2. does it render current product name/price/catagory?
//   3. does it show appropriate stars?
//   4. does it render 8 images of different styles?
//   5. does 'select size' show all sizes in stock?
//   6. does quantity show integers from 1 to stock or 15 max?
//   7. does add to cart do what its supposed to?
>>>>>>> 2f3425463db18dd8b39c6e6f6ba9e7726f208fcf
