const express = require("express");

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('client/dist'));

//get requests for page load (chain)
app.get('/products', (req, res) => {
  console.log('products req', req)
  res.send(200)
  //implement API request for list of products
  //send info to client

})
  .get('/products/:product_id', (req, res) => {
    console.log('product id req', req)
    res.send(200)
    //implement API request for product details
    //send info to client
  })
  .get('/products/:product_id/styles', (req, res) => {
    console.log('product styles req', req)
    res.send(200)
    //implement API request for product styles
    //send info to client

  })
  .get('/products/:product_id/related', (req, res) => {
    console.log('related products req', req)
    res.send(200)
    //implement API request for related products
    //send info to client

  })
  .get('/reviews', (req, res) => {
    console.log('reviews req', req)
    res.send(200)

    //implement API request for reviews
    //send info to client
  })
  .get('/reviews/meta', (req, res) => {
    console.log('reviews meta req', req)
    res.send(200)
    //implement API request for reviews meta data
    //send info to client

  })
  .get('/qa/questions', (req, res) => {
    console.log('questions req', req)
    res.send(200)
    //implement API request for product questions
    //send info to client

  })
  .get('/qa/questions/:question_id/answers', (req, res) => {
    console.log('answers', req)
    res.send(200)
    //implement API request for product answers
    //send info to client

  })
  .get('/cart', (req, res) => {
    console.log('cart', req)
    res.send(200)
    //implement API request for current cart
    //send info to client

  })




app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

