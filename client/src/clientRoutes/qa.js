const axios = require("axios");

module.exports = {
  questions: () => {
    return axios.get('/qa/questions');
  },
  answers: () => {
    return axios.get('/qa/questions/:question_id/answers');
  }
}
