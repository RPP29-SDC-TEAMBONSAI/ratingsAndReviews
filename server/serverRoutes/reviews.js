const axios = require("axios");
const TOKEN = require("../../config.js").GITHUB_TOKEN;
const api = require("../../config.js").API;

module.exports = {
  reviews: (req, res) => {
    // const { page, count, sort, product_id } = req.body;
    // const queryParams = `page=${page || ''}&count=${count || ''}&sort=${sort || ''}&product_id=${product_id || '28212'}`;
    // const url = `${api}reviews?${queryParams}`
    // const config = {
    //   method: 'get',
    //   url: url,
    //   headers: {
    //     'Authorization': TOKEN
    //   }
    // };

    // axios.get(config).then((data)=> {
    //   console.log("REVIEWS", data)
    //   res.status(200).send(data);
    // })
    // .catch(err => console.log('resultErr', err));
    res.status(200).end();
  },
  reviewsMeta: (req, res) => {
    res.status(200).end();
  }
}
