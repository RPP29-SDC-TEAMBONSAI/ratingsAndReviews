class QnAClientHelpers {
  constructor() {

  }
  sortQuestions (questions) {
    let newArr = []
    let sortedCount = []
    //time complexity bad - could refactor for performance!!!
    questions.forEach((question) => {
      sortedCount.push(question.question_helpfulness)

    })
    sortedCount = sortedCount.sort((a, b) => b - a);

    sortedCount.forEach((number) => {
      questions.forEach((question) => {
        if (question.question_helpfulness === number) {
          newArr.push(question)

        }
      })

    })
    return newArr;

  }

  sortAnswers(answers) {
    //need to be sorted based on seller answers first
    //then
    //helpfulness


    //super bad time complexity - probably needs to be refactored.
    let sortedArr = []
    let filteredOutSeller = answers.filter((answer) => {
      if (answer.answerer_name !== 'Seller') {
        return answer.helpfulness

      }
    })

    let countArr = [];
    filteredOutSeller.forEach((answer) => {
      countArr.push(answer.helpfulness)

    })


    countArr = countArr.sort((a, b) => (b - a));
    countArr.forEach((number) => {
      filteredOutSeller.forEach((answer) => {
         if (number === answer.helpfulness) {
           sortedArr.push(answer)
         }
      })
    })


    let filterSeller = answers.filter(answer => {
      if (answer.answerer_name === 'Seller') {
        return answer
      }
    });



   if (filterSeller.length) {

     sortedArr = filterSeller.concat(sortedArr)
   }
   return sortedArr

  }


}

export default QnAClientHelpers;