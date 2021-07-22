const axios = require("axios");

module.exports = {
  reviews: () => {
    return axios.get('/reviews');
  },
  reviewsMeta: () => {
    return axios.get('/reviews/meta');
  },
}