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
}

export default QnAClientHelpers;