const express = require("express");
const axios = require("axios");
const TOKEN = require("../config.js").GITHUB_TOKEN;
const api = require("../config.js").API;

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('client/dist'));

//get requests for page load (chain)
app.get('/products', (req, res) => {
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

res.send(200)


})
  .get('/products/:product_id', (req, res) => {
    //console.log('product id req', req)28212
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
  })
  .get('/products/:product_id/styles', (req, res) => {
    axios.get(api + 'products/28212/styles', {
      headers: {
        'Authorization': TOKEN
      }
    }).then((data)=> {
      console.log("STYLES", data.data)
      res.send(data.data.results)
    })
    .catch(err => console.log('erroryuh', err))


  })
  .get('/products/:product_id/related', (req, res) => {
    //console.log('related products req', req)
    res.send(200)
    //implement API request for related products
    //send info to client

  })
  .get('/reviews', (req, res) => {
    //console.log('reviews req', req)
    res.send(200)

    //implement API request for reviews
    //send info to client
  })
  .get('/reviews/meta', (req, res) => {
    //console.log('reviews meta req', req)
    res.send(200)
    //implement API request for reviews meta data
    //send info to client

  })
  .get('/qa/questions', (req, res) => {
    //console.log('questions req', req)
    res.send(200)
    //implement API request for product questions
    //send info to client

  })
  .get('/qa/questions/:question_id/answers', (req, res) => {
    //console.log('answers', req)
    res.send(200)
    //implement API request for product answers
    //send info to client

  })
  .get('/cart', (req, res) => {
    //console.log('cart', req)
    res.send(200)
    //implement API request for current cart
    //send info to client

  })




app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

