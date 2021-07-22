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
app.get('/products', (req, res) => { products(req, res) })
  .get('/products/:product_id', (req, res) => { productsWithId(req, res) })
  .get('/products/:product_id/styles', (req, res) => { productsStyle(req, res) })
  .get('/products/:product_id/related', (req, res) => { productsRelated(req, res) })
  .get('/reviews', (req, res) => { reviews(req, res) })
  .get('/reviews/meta', (req, res) => { reviewsMeta(req, res) })
  .get('/qa/questions', (req, res) => { questions(req, res) })
  .get('/qa/questions/:question_id/answers', (req, res) => { answers(req, res) })
  .get('/cart', (req, res) => { cart(req, res) })

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
