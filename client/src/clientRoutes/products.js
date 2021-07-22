const axios = require("axios");

module.exports = {
  products: () => {
    return axios.get('/products');
  },
  productsWithId: () => {
    return axios.get('/products/:product_id');
  },
  productsStyle: () => {
    return axios.get('/products/:product_id/styles');
  },
  productsRelated: () => {
    return axios.get('/products/:product_id/related');
  }
}
