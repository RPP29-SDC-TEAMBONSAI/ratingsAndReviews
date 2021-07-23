const axios = require("axios");
const TOKEN = require("../../config.js").GITHUB_TOKEN;
const api = require("../../config.js").API;

const requestConfig = (method, url) => {
  return {
    method: method,
    url: url,
    headers: {
      'Authorization': TOKEN
    }
  }
}

module.exports = {
  reviews: (req, res) => {
    axios(requestConfig('get', api + req.originalUrl.substring(1)))
      .then((data)=> {
        res.status(200).send(data.data.results);
      })
      .catch(err => console.log('resultErr', err));
  },
  reviewsMeta: (req, res) => {
    axios(requestConfig('get', api + req.originalUrl.substring(1)))
      .then((data)=> {
        res.status(200).send(data.data);
      })
      .catch(err => console.log('resultErr', err));
  }
}