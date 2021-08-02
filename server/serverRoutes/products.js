const axios = require("axios");
const TOKEN = require("../../config.js").GITHUB_TOKEN;
const api = require("../../config.js").API;

module.exports = {
  products: (req, res) => {
    //res.send(200)
    //implement API request for list of products
    //send info to client
    // axios.get(api + 'products', {
    //   headers: {
    //     'Authorization': TOKEN
    //   }
    // }).then((data)=> {
    //   console.log("data", data.data)
    // })
    // .catch(err => console.log('erroryuh', err))

  res.status(200).end();
  },
  productsWithId: (req, res) => {
    // console.log('product id req', req)28212
    let request = req.originalUrl.split('?');
    axios.get(api + `products/${request[1]}`, {
      headers: {
        'Authorization': TOKEN
      }
    }).then((data)=> {
      res.send(data.data)
    })
    .catch((err) => {
      console.log('erroryuh', err)
      res.status(500).end()
    })
    //implement API request for product details
    //send info to client
  },
  productsStyle: (req, res) => {
    let request = req.originalUrl.split('?');

    axios.get(api + `products/${request[1]}/styles`, {
      headers: {
        'Authorization': TOKEN
      }
    }).then((data)=> {
      res.send(data.data.results);
    })
    .catch((err) => {
      console.log('erroryuh', err)
      res.status(500).end()
    })
  },
  productsRelated: (req, res) => {
    let request = req.originalUrl.split('?');
    //console.log('🐮' ,request);
    axios.get(api + `products/${request[1]}/related`, {
      headers: {
        'Authorization': TOKEN
      }
    })
    .then((data) => {
      res.send(data.data)
    })
    .catch((err) => {
      console.log('err err errrr, ', err);
      res.status(500).end();
    })
  }
}

