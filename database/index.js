const { Pool, Client } = require('pg');
const psqlConfig = require('./config.js');

const pool = new Pool({
  user: psqlConfig.user,
  host: psqlConfig.host,
  database: psqlConfig.database,
  password: psqlConfig.password,
  port: psqlConfig.port
});

pool.query('SELECT NOW()', (err, res) => {
  // console.log(err, res);
  pool.end();
});

const client = new Client({
  user: psqlConfig.user,
  host: psqlConfig.host,
  database: psqlConfig.database,
  password: psqlConfig.password,
  port: psqlConfig.port
});
client.connect();
//status message

const getReviews = (id) => {
  return client.query(`SELECT reviews.id, reviews.productId, reviews.rating, reviews.datestamp, reviews.summary, reviews.body, reviews.recommended, reviews.reported, reviews.reviewerName, reviews.reviewerEmail, reviews.response, reviews.helpfulness, reviewsPhotos.reviewId, reviewsPhotos.url FROM reviews LEFT JOIN reviewsPhotos ON reviews.id = reviewsPhotos.reviewId WHERE reviews.productId = ${id};`)
    .then((res) => {
      return res.rows.map((row) => {
        let data = {
          review_id: row.id,
          rating: row.rating,
          summary: row.summary,
          recommend: row.recommended,
          response: row.response,
          body: row.body,
          date: row.date,
          reviewer_name: row.reviewername,
          helpfulness: row.helpfulness,
          photos: [{url: row.url}]
        }
        return data;
      })
    })
    .catch((err) => {
      console.log('ERR', err)
    })
}

const getMeta = (id) => {
  let result = {};
  return getRating(id)
    .then((ratingObj) => {
      return getRecommended(id)
        .then((recommendedObj) => {
          return getCharacteristics(id)
            .then((chars) => {
              result.product_id = id;
              result.ratings = ratingObj;
              result.recommended = recommendedObj;
              result.characteristics = chars;
              return result;
            })
        })
    })
    .catch((err) => {
      console.log('DB Meta Error', err)
    })
}

const getRating = (id) => {
  let result = {};
  return client.query(`SELECT rating FROM reviews WHERE productId = '${id}';`)
    .then((res) => {
      res.rows.forEach((row) => {
        if (result[row.rating] === undefined) {
          result[row.rating] = 1;
        } else {
          result[row.rating]++;
        }
        return result;
      })
      return result;
    })
    .catch((err) => {
      console.log('DB GetRating Error', err)
    })
}

const getRecommended = (id) => {
  let result = {};
  let falseCount = 0;
  let trueCount = 0;
  return client.query(`SELECT recommended FROM reviews WHERE productId = '${id}';`)
    .then((res) => {
      res.rows.forEach((row) => {
        if (row.recommended === 'false') {
          falseCount++;
        }
        if (row.recommended === 'true') {
          trueCount++;
        }
        if (falseCount > 0) {
          result.false = falseCount;
        }
        if (trueCount > 0) {
          result.true = trueCount;
        }
        return result;
      })
      return result;
    })
    .catch((err) => {
      console.log('DB GetRecommended Error', err)
    })
}

const getCharacteristics = (id) => {

  return client.query(`SELECT characteristics.id, characteristics.productId, characteristics.name, characteristicReviews.value FROM characteristics LEFT JOIN characteristicReviews ON characteristics.id = characteristicReviews.characteristicsId WHERE characteristics.productId = ${id};`)
  .then((res) => {
    let characteristics = {};
    let arr = [];
    for (let i = 0; i < res.rows.length; i++) {
      let row = res.rows[i]
      if (!characteristics[row.name]) {
        characteristics[row.name] = {
          id: row.id,
          value: [row.value]
        };
      } else if (characteristics[row.name]) {
        characteristics[row.name].value.push(row.value)
      }
    }

    for (let key in characteristics) {
      let val = 0
      let length = characteristics[key].value.length;
      let average = characteristics[key].value.reduce((prev, curr) => {
        return prev + curr;
      }, 0)
      characteristics[key].value = average / length
    }
    return characteristics;
  })
    .catch((err) => {
      console.log('DB GetCharacteristics Error', err)
    })
}

const resolveCharacteristics = (id) => {
  return getCharacteristics(id)
    .then((data) => {
      return Promise.all(data)
        .then((chars) => {
          return chars[0];
        })
    })
    .catch((err) => {
      console.log('DB GetAverage Error', err)
    })
}

const updateHelpful = (id) => {
  return client.query(`UPDATE reviews SET helpfulness = helpfulness::int + 1 WHERE id = '${id}';`)
}

const updateReported = (id) => {
  return client.query(`UPDATE reviews SET reported = TRUE WHERE id ='${id}';`)
}

const addReview = (bodyObj) => {
  return client.query(`INSERT INTO reviews (id, productId, rating, datestamp, summary, body, recommended, reported, reviewerName, reviewerEmail, response, helpfulness) VALUES (DEFAULT, ${bodyObj.product_id}, ${bodyObj.rating}, '1596080481467', '${bodyObj.summary}', '${bodyObj.body}', '${bodyObj.recommend}', 'false', '${bodyObj.name}', '${bodyObj.email}', 'null', '0') RETURNING id, productId;`)
    .then((res) => {
      Object.keys(bodyObj.characteristics).map((key, index) => {
        return client.query(`INSERT INTO characteristicReviews (id, characteristicsId, reviewsId, value) VALUES (DEFAULT, ${key}, ${res.rows[0].id}, ${bodyObj.characteristics[key]}) RETURNING id;`)
      })
    })
    .catch((err) => {
      console.log('DB ADD ERROR', err)
    })
}

const relatedRatings = (id) => {
  return client.query(`SELECT productId, rating FROM reviews WHERE productId IN (${id});`)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log('DB GetRating Error', err)
    })
}


// getReviews(47212);
// getMeta(1)
// getRating(1)
// getRecommended(4)
// getCharacteristics(1)
// getAverage(12)
// addCharacteristics(1)
// addReview({
//   product_id: 47421,
//   rating: 4,
//   summary: 'dfdfgvdfg',
//   body: 'dfgdfgdfgdfgdfgdfkngkdfngkjdngkjdfjngkjdfngkjdfngkjdfngn',
//   recommend: true,
//   name: 'dfgdfkgjnkdfjng',
//   email: 'kjnkjn@dkfsjnkjf.com',
//   photos: [],
//   characteristics: { '158622': 1, '158623': 1, '158624': 1, '158625': 1 }
// })
module.exports.getReviews = getReviews;
module.exports.getMeta = getMeta;
module.exports.updateHelpful = updateHelpful;
module.exports.updateReported = updateReported;
module.exports.addReview = addReview;
module.exports.relatedRatings = relatedRatings;