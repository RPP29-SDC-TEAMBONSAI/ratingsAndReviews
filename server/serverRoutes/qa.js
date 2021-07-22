const axios = require("axios");
const TOKEN = require("../../config.js").GITHUB_TOKEN;
const api = require("../../config.js").API;

module.exports = {
  questions: (req, res) => {
    //console.log('questions req', req)
    res.status(200).end();
    //implement API request for product questions
    //send info to client
  },
  answers: (req, res) => {
    //console.log('answers', req)
    res.status(200).end();
    //implement API request for product answers
    //send info to client
  }
}
