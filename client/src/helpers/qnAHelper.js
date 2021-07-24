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
          if (!newArr.includes(question)) {
            newArr.push(question)
          }
        }

      })

    })


    return newArr;

  }

  sortAnswers(answers, count = answers.length -1, final =[]) {

    //needs optimization
    if (count >=0) {
      let current = answers.splice(0, 1);
      let filteredOutSeller = current[0].filter((answer) => {
        if (answer.answerer_name !== 'Seller') {

          return answer

        }

      })

      let countArr = filteredOutSeller.map((answer) => {
        return answer.helpfulness
      })
      countArr = countArr.sort((a, b) => (b - a));

      let sortedArr=[]

      countArr.forEach((number) => {
        filteredOutSeller.forEach((answer) => {
          if (number === answer.helpfulness) {
            sortedArr.push(answer)
          }
        })
      })
      let filterSeller = current[0].filter((answer) => {
        if (answer.answerer_name === 'Seller') {
          return answer
        }
      })
      if (filterSeller.length) {

        sortedArr = filterSeller.concat(sortedArr)
      }
      final.push(sortedArr)
      count --
      this.sortAnswers(answers, count, final)

    }
    return final
  }

  filterAll(currentQuestions) {
    let filteredQuestions = this.sortQuestions(currentQuestions);

    //get answers
    let answers = []
    currentQuestions.forEach((question) => {


      answers.push(question.answers)

    })

    let answerVals = []

    filteredQuestions.forEach((question) => {
      let values = Object.values(question.answers)

      answerVals.push(values)
    })

    let filteredAnswers = this.sortAnswers(answerVals)


    return [filteredQuestions, filteredAnswers]

  }

  filterSearchInput(currentQuestions, searchTerm) {

    let newQuestions = currentQuestions.filter((question) => {
      let lowerCaseQuestion = question.question_body.toLowerCase().replace(/\s+/g, '')
      let lowerCaseInput = searchTerm.toLowerCase().replace(/\s+/g, '')

      if (lowerCaseQuestion.includes(lowerCaseInput)) {
        return question

      }

    })

    return newQuestions
  }

  showMoreAnsweredQuestions(arr) {
    let showButton;
      if (arr[0].length) {
        showButton = true;
      } else {
        showButton = false
      }
      return showButton
  }

  showMoreAnsweredBtnClass(bool, qClickCount, index) {
    let newClass;
    if (bool) {
      newClass = 'moreAnsweredBtn'
    }

    if (qClickCount === index|| qClickCount - 1 === index) {
      // console.log('hi')
      newClass = 'moreAnswerBtn Hide'
    }

    return newClass

  }

  loadAnswerButtonText(currentCount) {
    let text;

    if (currentCount % 2 !== 0) {
      text = 'Collapse Answers'

    } else {
      text = 'Load More Answers'
    }
    return text
  }

  qListScrollClass (count) {
    let newClass;
    if (count > 1) {
      newClass = 'questionList scroll container'
    }
    return newClass

  }

  answerHideClass(classname, index) {
    let newClass
    if (index <= 1) {
      newClass = 'answerListTable'
    }
    if (classname === 'Hide') {
      newClass = 'answerListTable Hide'
    }

    if (index >= 2) {
      newClass = 'answerListTable Hide'
    }
    return newClass
  }

  answerTableHideClass(count, i) {
    let newClass;
    if (count % 2 !== 0)  {
      if (i >= 2) {
        newClass = 'answerListTable'

      }

    } else {

      if (i >= 2) {
        newClass = 'answerListTable Hide'

      }
    }
    return newClass

  }

  answerScrollClass(count){
    let newClass;

    if (count % 2 !== 0) {
      newClass = 'list scroll container'
    }

    return newClass
  }

  showQuestionsClass(count, index) {
    let newClass;

    if (count % 2 !== 0) {
      if (index <= count) {
        newClass = 'questionText'
      }
    }
    return newClass
  }


}

export default QnAClientHelpers;