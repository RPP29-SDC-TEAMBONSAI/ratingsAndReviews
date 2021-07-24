const axios = require("axios");

module.exports = {
  questions: (id) => {
    return axios.get(`/qa/questions/:product_id=${id}`);
  },
  answers: () => {
    return axios.get('/qa/questions/:question_id/answers');
  }
}
