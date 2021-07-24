const express = require("express");
const app = express();
const PORT = 3000;

// SERVER ROUTES
const { reviews, reviewsMeta } = require("./serverRoutes/reviews.js");
const { products, productsWithId, productsStyle, productsRelated } = require("./serverRoutes/products.js");
const { questions, answers } = require("./serverRoutes/qa.js");
const { cart } = require("./serverRoutes/cart.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('client/dist'));

//get requests for page load (chain)
app.get('/products', products)
  .get('/products/:product_id', productsWithId)
  .get('/products/:product_id/styles', productsStyle)
  .get('/products/:product_id/related', productsRelated)
  .get('/reviews', reviews)
  .get('/reviews/meta', reviewsMeta)
  .get('/qa/questions/:product_id?', questions)
  .get('/qa/questions/:question_id/answers', answers)
  .get('/cart', cart)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
