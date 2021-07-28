const axios = require("axios");

module.exports = {
  products: () => {
    return axios.get('/products');
  },
  productsWithId: (id) => {
    console.log(`product info client req for ${id}`)
    return axios.get(`/products/:product_id?${id}`);
  },
  productsStyle: (id) => {
    console.log(`product style client req for ${id}`)
    return axios.get(`/products/:product_id/styles?${id}`);
  },
  productsRelated: (id) => {
    return axios.get(`/products/:product_id/related?${id}`);
  }
}
