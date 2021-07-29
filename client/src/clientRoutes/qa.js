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

  },

  updateAnswerHelpfulness(id) {
    console.log(id)
    return axios.put(`/qa/answers/:answer_id=${id}`)
      .then(data => {

        return data
      })

  },

  postQuestion(newQuestion) {

    return axios.post(`/qa/questions`, newQuestion)
      .then(data => {
        return data

      })

  },

  postAnswer(newAnswer) {

    return axios.post(`/qa/questions/:question_id=${''}/answers`, newAnswer)
      .then(data => {
        return data

      })



  },

  getUrl(base64Str){
    let newObj ={
      file: base64Str
    }
    // console.log(base64Str,)
    return axios.post('/qa/questions/get/photo-url', newObj)
      .then((newUrl) => {
        // console.log(newUrl,  "🔥")
        return newUrl.data

      })

  }

}
