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
    axios.get(api + 'products/28212', {
      headers: {
        'Authorization': TOKEN
      }
    }).then((data)=> {
      console.log("data", data.data)
      res.send(data.data)
    })
    .catch(err => console.log('erroryuh', err))

    //implement API request for product details
    //send info to client
    res.status(200).end();
  },
  productsStyle: (req, res) => {
    axios.get(api + 'products/28212/styles', {
      headers: {
        'Authorization': TOKEN
      }
    }).then((data)=> {
      console.log("STYLES", data.data)
      res.send(data.data.results)
    })
    .catch(err => console.log('erroryuh', err))

    res.status(200).end();
  },
  productsRelated: (req, res) => {
    //console.log('related products req', req)
    res.status(200).end();
    //implement API request for related products
    //send info to client
  }
}

