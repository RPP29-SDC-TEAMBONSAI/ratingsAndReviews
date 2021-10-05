const axios = require("axios");
const TOKEN = require("../../config.js").GITHUB_TOKEN;
const api = require("../../config.js").API;
const db = require("../../database/index.js");
const redis = require("redis");
const client = redis.createClient({ port: 6379 });

client.on('connect', () => {
  console.log('Redis Connected')
});
client.on('error', (err) => {
  console.log('Redis Error', err);
});

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
    try {
      client.get(req.query.product_id, (err, reply) => {
        if (err) {
          throw err;
        }
        if (reply) {
          console.log('REPLY', reply)
          res.status(200).send(JSON.parse(reply));
        } else {
          db.getReviews(req.query.product_id)
            .then((data) => {
              console.log('DATA', data)
              client.set(req.query.product_id, JSON.stringify(data))
              res.status(200).send(data);
            })
        }
      })
    }
    catch (err) {
      console.log('resultErr', err);
      res.status(400).send('Server error in reviews')
    }
  },
  reviewsMeta: (req, res) => {
    try {
      client.get('meta' + req.query.product_id, (err, reply) => {
        if (err) {
          throw err;
        }
        if (reply) {
          console.log('META REPLY', reply);
          res.status(200).send(JSON.parse(reply));
        } else {
          db.getMeta(req.query.product_id)
          .then((data) => {
            console.log('META DATA', data);
            client.set('meta' + req.query.product_id, JSON.stringify(data))
            res.status(200).send(data);
          })
        }
      })
    }
    catch (err) {
      console.log('Meta Error', err)
      res.status(400).send('Server getMeta Error')
    }
  },
  reviewsHelpful: (req, res) => {
    db.updateHelpful(req.body.id)
      .then((data) => {
        res.status(200).send(data)
      })
      .catch((err) => {
        console.log('helpfulErr', err);
        res.status(400).send('Server error in reviews helpful')
      })
  },
  reviewsReport: (req, res) => {
    db.updateReported(req.body.id)
      .then((data) => {
        res.status(200).send(data)
      })
      .catch((err) => {
        console.log('reportReviewErr', err);
        res.status(400).send('Server error in reviews report')
      })
  },
  reviewsAdd: (req, res) => {
    db.addReview(req.body)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log('addReview', err);
        res.status(400).send('Server error in reviews add')
      })
  },
  reviewsInteraction: (req, res) => {
    axios(requestConfig('post', api + 'interactions', req.body))
      .then((data) => {
        res.status(200).send(data.data);
      })
      .catch(err => console.log('resultErr', err));
  },
  relatedRating: (req, res) => {
    db.relatedRatings(req.query.related.split(',').map(Number))
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log(err)
        res.status(400).send('Related Rating Error');
      })
  }
}