const axios = require("axios");

module.exports = {
  reviews: (page, count, sort, product_id) => {
    return axios.get(
      `/reviews?page=${page || 1}&count=${count || 5}&sort=${sort || 'newest'}&product_id=${product_id || 36300}`
    );
  },
  reviewsMeta: (product_id) => {
    return axios.get(
      `/reviews/meta?product_id=${product_id || 36300}`
    );
  },
  reviewHelpful: (review_id) => {
    return axios.put(
      `/reviews/${review_id}/helpful`, {
        id: review_id
      }
    );
  },
  reviewReport: (review_id) => {
    return axios.put(
      `/reviews/${review_id}/report`, {
        id: review_id
      }
    );
  },
  reviewAdd: (reviewData, product_id) => {
    let newChars = {};
    let oldChars = Object.assign(reviewData.characteristics);

    for (let char in oldChars) {
      newChars[char]= parseInt(oldChars[char]);
    }

    let review = {
      product_id: product_id,
      rating: parseInt(reviewData.rating),
      summary: reviewData.summary,
      body: reviewData.body,
      recommend: reviewData.recommend === 'No' ? false : true,
      name: reviewData.name,
      email: reviewData.email,
      photos: reviewData.photos,
      characteristics: newChars
    }
    return axios.post(`/reviews/add`, review)
  },
  reviewsInteraction: (event) => {
    event.stopPropagation();
    name = event.target.className || null;
    axios.post(
      `/reviews/interaction`, {
        element: name,
        widget: 'Ratings And Reviews - Team Cotija',
        time: new Date()
      }
    );
  }
}