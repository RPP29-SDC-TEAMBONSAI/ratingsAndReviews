const axios = require("axios");
const TOKEN = require("../../config.js").GITHUB_TOKEN;
const api = require("../../config.js").API;
const db = require("../../database/index.js");

const requestConfig = (method, url, data) => {
  return {
    method: method,
    url: url,
    headers: {
      'Authorization': TOKEN
    },
    data: data
  }
}

module.exports = {
  reviews: (req, res) => {
    db.getReviews(req.query.product_id)
    .then((data) => {
      Promise.all(data)
      .then((each) => {
        res.status(200).send(each);
      })
    })
    .catch((err) => {
      console.log('resultErr', err);
    })

    // axios(requestConfig('get', api + req.originalUrl.substring(1)))
    //   .then((data)=> {
    //     console.log(data.data.results)
    //     res.status(200).send(data.data.results);
    //   })
    //   .catch(err => console.log('resultErr', err));
  },
  reviewsMeta: (req, res) => {
    db.getMeta(req.query.product_id)
    .then((data) => {
      res.status(200).send(data);
    })
    // axios(requestConfig('get', api + req.originalUrl.substring(1)))
    //   .then((data)=> {
    //     console.log('META', data.data)
    //     res.status(200).send(data.data);
    //   })
    //   .catch(err => console.log('resultErr', err));
  },
  reviewsHelpful: (req, res) => {
    db.updateHelpful(req.body.id)
    .then((data) => {
      console.log(data)
      res.status(200).send(data)
    })

    // axios(requestConfig('put', api + req.originalUrl.substring(1)))
    //   .then((data)=> {
    //     res.status(200).send(data.data);
    //   })
    //   .catch(err => console.log('resultErr', err));
  },
  reviewsReport: (req, res) => {
    db.updateReported(req.body.id)
    .then((data) => {
      res.status(200).send(data)
    })
    // axios(requestConfig('put', api + req.originalUrl.substring(1)))
    //   .then((data)=> {
    //     res.status(200).send(data.data);
    //   })
    //   .catch(err => console.log('resultErr', err));
  },
  reviewsAdd: (req, res) => {
    db.addReview(req.body)
    .then((data) => {
      console.log('SERVER DATA', data)
      Promise.all(data)
      .then((prom) => {
        console.log(prom)
      })
      // res.status(200).send(data);
    })
    // axios(requestConfig('post', api + 'reviews', req.body))
    //   .then((data)=> {
    //     res.status(200).send(data.data);
    //   })
    //   .catch(err => console.log('resultErr', err));
  },
  reviewsInteraction: (req, res) => {
    axios(requestConfig('post', api + 'interactions', req.body))
      .then((data)=> {
        res.status(200).send(data.data);
      })
      .catch(err => console.log('resultErr', err));
  }
}