const axios = require("axios");
const TOKEN = require("../../config.js").GITHUB_TOKEN;
const api = require("../../config.js").API;

module.exports = {
  cart: (req, res) => {
    //console.log('cart', req)
    res.status(200).end();
    //implement API request for current cart
    //send info to client
  }
}
