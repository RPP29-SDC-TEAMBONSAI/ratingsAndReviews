import { reviewsTD, reviewsMetaTD } from '../../../src/RatingsAndReviews/TestData/data.js';
import newData from '../../RatingsAndReviews/TestData/newData.js'

module.exports = {
  //parameters wont be used for didMountTests as mock data is going to be returned
  reviews: jest.fn((page, count, sort, productId) =>Promise.resolve({data: newData.reviews}))

}