const axios = require("axios");

module.exports = {
  reviews: (page, count, sort, product_id) => {
    return axios.get(
      `/reviews?page=${page || 1}&count=${count || 5}&sort=${sort || 'newest'}&product_id=${product_id || 28212}`
    );
  },
  reviewsMeta: (product_id) => {
    return axios.get(
      `/reviews/meta?product_id=${product_id || 28212}`
    );
  },
  reviewHelpful: (review_id) => {
    return axios.put(
      `/reviews/${review_id}/helpful`
    );
  },
  reviewReport: (review_id) => {
    return axios.put(
      `/reviews/${review_id}/report`
    );
  }
}