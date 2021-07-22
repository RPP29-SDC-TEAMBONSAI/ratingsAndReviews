const axios = require("axios");

module.exports = {
  cart: () => {
    return axios.get('/cart');
  }
}
