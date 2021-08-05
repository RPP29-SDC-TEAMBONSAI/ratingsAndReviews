module.exports = {
  sortQuestions (questions) {
    let newArr = []
    let sortedCount = []
    //time complexity bad - could refactor for performance!!!
    let filterAnswers = questions.map((q) => {
      let newArr=[]
      newArr.push(q.answers)
      return newArr



    })



    let creatArr = (arr, count =filterAnswers.length -1, result =[]) => {


      if(count > 0) {
        let current = arr.splice(0, 1)
        // console.log(current)
        // console.log(arr)
        for (let key in current[0]) {
          // console.log(Object.values(current[0][key]))
          Object.values(current[0][key]).forEach((obj) => {
            // let temp = [];
            // temp.push(obj)
            result.push(obj)
          })

        }
        // console.log(result)


      }

    }
    let newans = creatArr(filterAnswers.slice())


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

  },
//HOLY MOLY - this function got crazy - needed to refactor because it was duplicating answers displayed after sort
//now it seems to function properly.  Sorts answers by seller and sellerhelpfulness, then sorts remaining user answers
//based on helpfulness
  sortAnswers(answers) {
    //create new storage array
    let newArr = new Array(answers.length);
    //handle questions without answers (empty answerArr)
    answers.forEach((answerArr, index) => {
      if (!answerArr.length) {
        newArr[index] = answerArr
      }
      //if there are answers
      if (answerArr.length) {
        //seperate sellers and answers
        let sortIndivdual = (arr) => {
          let sellers = []
          let users = []

          arr.forEach((answer, index) => {
            if (answer.answerer_name === 'Seller') {
              sellers.push(answer)
            } else {
              users.push(answer)
            }
          })
          //sort seller count
          let sellerCount = sellers.map((ans) => {
            return ans.helpfulness

          })

          //sort seller answers by helpfulness with sellerCount indexes
          sellerCount = sellerCount.sort((a, b)=> b-a)
          let finalSellers = [];
          sellerCount.forEach((count) => {
            sellers.forEach((ans) => {
              if (ans.helpfulness === count) {
                finalSellers.push(ans)
              }

            })
          })

          //sort userArr for helpfulness
          let fAnswer = (userArr, final=[]) => {
            //get answers without 0
            let ansWithout0 = userArr.filter((ans) => {
              if (ans.helpfulness !== 0) {
                return ans
              }
            })
            //get answers with 0
            let answerWith0 = userArr.filter((ans) => {
              if(ans.helpfulness === 0) {
                return ans
              }
            })
            //sort answers helpfulness for answers without 0 from greatest to least
            let without0Count = ansWithout0.map((ans) => {
              return ans.helpfulness
            }).sort((a, b)=> b-a)
            //if without0Count has length
            if (without0Count.length) {
              //add final answers to finalWithout 0
              let finalWithout0 = [];
              without0Count.forEach((num) =>{
                ansWithout0.forEach((ans) => {
                  if (num === ans.helpfulness) {
                    finalWithout0.push(ans)
                  }
                })
              })
              //combine the final wihtout0 with answer with0 so that they are shown from least to greatest
              final = finalWithout0.concat(answerWith0)

            }
            //if without0 does not have length

            if (!without0Count.length) {
              //final equals just the answers with 0
              final = answerWith0
            }
            //return final user answers
            return final

          }

          let fUserAnswerFinal = fAnswer(users.slice())
          let final = [];
          //combine final sellerss with final users
          final = finalSellers.concat(fUserAnswerFinal)
          return final

        }

        let final = sortIndivdual(answerArr.slice())
        //assign each final answer sorted to the newArr at index
        newArr[index] = final
    }

    })
    //return newArr
    return newArr


  },

  filterAll(currentQuestions) {
    let answers = new Array(currentQuestions.length)
    let arr =[]
    currentQuestions.forEach((question, index) => {
      let ansArr = []
      // ansArr.push(Object.values(question.answers))
      answers[index] = Object.values(question.answers)
    })
    let copy = currentQuestions.slice();
    // console.log(copy.length)
    // console.log(answers.length)
    copy.forEach((question, index) => {
      answers.forEach((ans, i) => {
        if (index === i) {
          question.answers = ans
        }
      })
    })

    let sortedQuestions = this.sortQuestions(copy)
    let answersArr =[]
    sortedQuestions.forEach((question) => {
      answersArr.push(question.answers)
    })

    let sortedAnswers = this.sortAnswers(answersArr)
    // console.log([sortedQuestions, sortedAnswers])


    return [sortedQuestions, sortedAnswers]
  },

  filterSearchInput(currentQuestions, searchTerm) {


    let newQuestions = currentQuestions.filter((question) => {
      let lowerCaseQuestion = question.question_body.toLowerCase().replace(/\s+/g, '')
      let lowerCaseInput = searchTerm.toLowerCase().replace(/\s+/g, '')

      if (lowerCaseQuestion.includes(lowerCaseInput)) {
        return question

      }

    })

    return newQuestions
  },

  showMoreAnsweredQuestions(arr) {

    let showButton;
      if (arr[0].length > 2) {
        showButton = true;
      } else {
        showButton = false
      }
      return showButton
  },

  moreAnsweredQButtonDisplay(qClickCount, index) {
    let result = true;
    if (qClickCount === index || qClickCount + 1 === index) {
      result= false;
    }
    return result
  },

  loadAnswerButtonText(currentCount) {
    let text;

    if (currentCount % 2 !== 0) {
      text = 'Collapse Answers'

    } else {
      text = 'Load More Answers'
    }
    return text
  },

  qListScrollClass (count) {
    let newClass;
    if (count > 1) {
      newClass = 'questionList scroll container'
    }
    return newClass

  },

  answerHideClass(classname, index) {
    let newClass;


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
  },

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

  },

  answerScrollClass(count){
    let newClass;

    if (count % 2 !== 0) {
      newClass = 'list scroll container'
    }

    return newClass
  },

  showQuestionsClass(clickCount, index) {

    let newClass;
    if (clickCount % 2 !== 0) {
      if (index <= clickCount) {
        newClass = 'questionText'
      }
    }
    return newClass
  },

  showReportedClass(answers, ids) {

    answers.forEach((answer) => {
      answer.forEach((obj) => {
        if (ids.includes(obj.id)) {
          obj.report = 'reported'
        } else {
          obj.report = 'report'
        }
      })
    })
    // console.log(answers, "👌")
    return answers;


  }



}


//old filterAll
// let filteredQuestions = this.sortQuestions(currentQuestions);
// let answers = []

// currentQuestions.forEach((question) => {
//   answers.push(question.answers)

// })

// let answerVals = []
// filteredQuestions.forEach((question) => {
//   let values = Object.values(question.answers)
//   answerVals.push(values)
// })

// let filteredAnswers = this.sortAnswers(answerVals)
// return [filteredQuestions, filteredAnswers]


//

// //previous sort answer functionality.
//     //needs optimization
//     if (count >=0) {
//       let current = answers.splice(0, 1);
//       let filteredOutSeller = current[0].filter((answer) => {
//         if (answer.answerer_name !== 'Seller') {

//           return answer

//         }

//       })

//       let countArr = filteredOutSeller.map((answer) => {
//         return answer.helpfulness
//       })
//       countArr = countArr.sort((a, b) => (b - a));
//       let sortedArr=[]

//       countArr.forEach((number) => {
//         filteredOutSeller.forEach((answer) => {
//           if (number === answer.helpfulness) {
//             sortedArr.push(answer)
//           }
//         })
//       })
//       let filterSeller = current[0].filter((answer) => {
//         if (answer.answerer_name === 'Seller') {

//           return answer
//         }
//       })
//       let sellerCountArr = filterSeller.map((answer) => {
//         return answer.helpfulness
//       })
//       sellerCountArr = sellerCountArr.sort().reverse()

//       let sellerSortArr =[]


//       sellerCountArr.forEach(number => {
//         filterSeller.forEach(answer => {
//           if (number === answer.helpfulness) {
//             sellerSortArr.push(answer)
//           }
//         })
//       })

//       if (sellerSortArr.length) {


//         sortedArr = sellerSortArr.concat(sortedArr)
//       }
//       final.push(sortedArr)
//       count --
//       this.sortAnswers(answers, count, final)

//     }
//     console.log(final, "🤙")

//     return final


