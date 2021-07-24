const axios = require("axios");

module.exports = {
  questions: (id) => {
    return axios.get(`/qa/questions/:product_id=${id}`);
  },
  answers: () => {
    return axios.get('/qa/questions/:question_id/answers');
  },
  updateHelpfulness: (id) => {

    return axios.put(`/qa/questions/:question_id=${id}`)
      .then(data =>{
        return data
      })

  }
}
