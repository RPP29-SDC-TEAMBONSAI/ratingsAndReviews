import { reviewsTD, reviewsMetaTD } from '../../../src/RatingsAndReviews/TestData/data.js';

module.exports = {
  reviews: jest.fn(() => {
    Promise.resolve({
      data: reviewsTD[28212]
    });
  }),
  reviewsMeta: jest.fn(() => {
    Promise.resolve({
      data: reviewsMetaTD[28212]
    });
  })
}