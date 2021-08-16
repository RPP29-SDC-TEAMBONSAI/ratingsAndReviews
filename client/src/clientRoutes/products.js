const axios = require("axios");

module.exports = {
  products: () => {
    return axios.get('/products');
  },
  productsWithId: (id) => {
    return axios.get(`/products/:product_id?${id}`);
  },
  productsStyle: (id) => {
    return axios.get(`/products/:product_id/styles?${id}`);
  },
  productsRelated: (id) => {
    return axios.get(`/products/:product_id/related?${id}`);
  }
}
