const newrelic = require('newrelic');
const express = require("express");
const app = express();
const PORT = 3000;
const path = require('path');

// SERVER ROUTES
const { reviews, reviewsMeta, reviewsHelpful, reviewsReport, reviewsAdd, reviewsInteraction, relatedRating } = require("./serverRoutes/reviews.js");
const { products, productsWithId, productsStyle, productsRelated } = require("./serverRoutes/products.js");
const { questions, answers, updateHelpfulness, updateAnswerHelpfulness, postQuestion, postAnswer, getUrl, addToReported, getReported, interactions} = require("./serverRoutes/qa.js");
const { cart, addToCart } = require("./serverRoutes/cart.js");

const multer = require('multer')

// const upload = multer({dest:'./temp'})


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('client/dist'));
// app.use('/reviews', reviews);
app.use('/loaderio-0f420f57b7d74f73d66ea53366e40b7c.txt', express.static(path.join(__dirname, '../loaderio-0f420f57b7d74f73d66ea53366e40b7c.txt')));


app.get('/products', products)
  .get('/products/:product_id', productsWithId)
  .get('/products/:product_id/styles', productsStyle)
  .get('/products/:product_id/related', productsRelated)
  .get('/reviews', reviews)
  .get('/reviews/meta', reviewsMeta)
  .get('/reviews/relatedRatings', relatedRating)
  .get('/qa/questions/:product_id?', questions)
  .get('/qa/questions/:question_id/answers', answers)
  .get('/cart', cart)
  .post('/cart', addToCart)

  .put('/qa/questions/:question_id?', updateHelpfulness)

  .put('/qa/answers/:answer_id?', updateAnswerHelpfulness)

  .post('/qa/questions', postQuestion)

  .post('/qa/questions/:question_id?/answers', postAnswer)
  .post('/qa/questions/get/photo-url', getUrl)
  .post('/qa/questions/store-reported-answer', addToReported)
  .get('/reported/answers', getReported)
  .put('/reviews/:review_id/helpful', reviewsHelpful)
  .put('/reviews/:review_id/report', reviewsReport)
  .post('/reviews/add', reviewsAdd)
  .post('/reviews/interaction', reviewsInteraction)
  .post('/qa/interactions', interactions)


module.exports = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
