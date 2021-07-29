const axios = require("axios");
const TOKEN = require("../../config.js").GITHUB_TOKEN;
const api = require("../../config.js").API;
const key = require("../../config.js").imgBBKey
const imgbbUploader = require('imgbb-uploader')
const fs = require('fs')

const { Buffer } = require('buffer');

module.exports = {
  questions: (req, res) => {

    let url = req.url.split('=')
    let request = api + `qa/questions?product_id=${Number(url[1])}&page=1&count=25`

    axios.get(request, {
      headers: {
        'Authorization': TOKEN
      }
    }).then((data) => {

      res.send(data.data.results).end();

    })
  },
  answers: (req, res) => {

    res.status(200).end();

  },
  updateHelpfulness: (req, res) => {

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
  },

  updateAnswerHelpfulness: (req, res) => {

    let id = Number(req.url.split('=')[1])
    axios.put(api + `qa/answers/${id}/helpful`, id.toString(), {
      headers: {
        'Authorization': TOKEN
      }
    })
      .then(data => {

        res.send(200)
      })
      .catch(err => console.log(err))
  },

  postQuestion: (req, res) => {

    let newQuestion = req.body
    axios.post(api + `qa/questions`, newQuestion, {
      headers: {
        'Authorization': TOKEN
      }
    }).then(data => {

      res.send(200)
    })
    .catch(err => console.log(err, "🤙"))
  },

  postAnswer: (req, res) => {

  let newAnswer = {
    body: req.body.body,
    name: req.body.name,
    email: req.body.email,
    photos: req.body.photos
  }

  axios.post(api + `qa/questions/${req.body.currentId}/answers`, newAnswer, {
    headers: {
      'Authorization': TOKEN
    }
  }).then(data => res.send(data.status))

  },

  getUrl: (req, res) => {

    let file=req.body.file.split('base64,')[1]
    const options = {
      apiKey: key,
      expiration: 360,
      base64string: file,

    };
    imgbbUploader(options)
     .then((response) =>res.send(response.url))
  },

  addToReported: (req, res) => {
    console.log(req.body)

    // client/src/questions-n-answers/reviewAnswers
    const data = new Uint8Array(Buffer.from(req.body.id.toString()))
    console.log(data)
    let write = async() => {
      let value = new Promise((resolve, reject) => {
        fs.writeFile(`./client/src/questions-n-answers/reviewAnswers/${req.body.id.toString()}.txt`, data, (err) => {
          if (err) { console.log(err, "😢")}

          resolve(true)
        })
      })
     let final= await(value);
      return final
    }

     write().then(data => {
       fs.readdir('./client/src/questions-n-answers/reviewAnswers/', (err, files) => {
        //  console.log(files, )
         let answerIds = [];

         files.forEach((file) => {
           let newFile = Number(file.split('.')[0])
           answerIds.push(newFile)

         })
         res.send(answerIds)
        //  console.log(answerIds, "🔥")
       })
     })

    // fs.writeFile('../../client/src/questions-n-answers/reviewAnswers/reported.json', JSON.stringify(req.body), 'utf-8', (data) => {
    //   console.log(data, "🔥")
    // })

  },
  getReported: (req, res) => {

    return fs.readdir('./client/src/questions-n-answers/reviewAnswers/', (err, files) => {
      //  console.log(files, )
       let answerIds = [];

       files.forEach((file) => {
         let newFile = Number(file.split('.')[0])
         answerIds.push(newFile)

       })
       res.send(answerIds)

     })
  }



}
