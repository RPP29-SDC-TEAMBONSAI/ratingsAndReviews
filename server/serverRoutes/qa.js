const axios = require("axios");
const TOKEN = require("../../config.js").GITHUB_TOKEN;
const api = require("../../config.js").API;

module.exports = {
  questions: (req, res) => {
    // qa/questions\?product_id\=28213
    console.log('questions req', req.url)
    let url = req.url.split('=')
    let request = api + `qa/questions?product_id=${Number(url[1])}`

    axios.get(request, {
      headers: {
        'Authorization': TOKEN
      }
    }).then((data) => {

      res.send(data.data.results).end();

    })
  },
  answers: (req, res) => {
    //console.log('answers', req)
    res.status(200).end();
    //implement API request for product answers
    //send info to client
  },
  updateHelpfulness: (req, res) => {
    console.log(req.url)
    let id = Number(req.url.split('=')[1])
    axios.put(api + `qa/questions/${id}/helpful`, id.toString(), {
      headers: {
        'Authorization': TOKEN
      }
    }).then(data=> {
      res.send(200)

      })
      .catch(err=> {
        console.log(err)
      })

    console.log(id)

  }

}
