import React from 'react';
import Search from './sub-components/search.jsx'
import QuestionsContainer from './sub-components/questionContainer.jsx';
import helper from '../helpers/qnAHelper.js';
import UserQuestion from './sub-components/mini-components/userQuestion.jsx';
import propTypes from 'prop-types';
import UserAnswer from './sub-components/mini-components/userAnswer.jsx';
import {updateHelpfulness, questions, updateAnswerHelpfulness, addToReported, getReportedAns} from '../clientRoutes/qa';
import ClickTracker from './tracker.jsx'
import AllClicks from './allClicks.jsx';
class QuestionsNAnswers extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
      questions: [],
      answers: [],
      showQuestionButton: false,
      questionSearchVal: 'HAVE A QUESTION? SEARCH FOR ANSWERS...',
      qSearchCharCount: 0,
      qFormShowOrHide: 'qFormHide',
      aFormShowOrHide: 'aFormHide',
      currentQuestion:'',
      reported: []
    };
    //factor all clicks out into their own renderProps onclick??

    this.searchFilter = this.searchFilter.bind(this)
    this.filterAnswersNQuestions = this.filterAnswersNQuestions.bind(this)
    this.questionSearchChange = this.questionSearchChange.bind(this)
    this.showQuestions = this.showQuestions.bind(this)


    this.addAnswerOnClick = this.addAnswerOnClick.bind(this)
    this.addQuestion = this.addQuestion.bind(this)

    this.updateQuestions = this.updateQuestions.bind(this)
    this.updateAnswers = this.updateAnswers.bind(this)
    this.addToReported = this.addToReported.bind(this)
    this.getReportedAns = getReportedAns.bind(this)

  }
  componentDidMount() {
    getReportedAns()
      .then(data => {

        let answerIds = data.data
        let copy = this.props.data.slice()
        let sortedData= this.filterAnswersNQuestions(copy)
        let answers = helper.showReportedClass(sortedData[1], answerIds)

          this.setState({
            questions: sortedData[0],
            answers: answers,
            reported: answerIds
          })
      })
  }

  componentDidUpdate(prevProps, prevState) {

    let copy = this.props.data.slice()
    if (prevProps.product_id !== this.props.product_id) {
      this.setState({
        questionClickCount:1
      })
    }

    if (prevProps.data.length !== this.props.data.length) {

      let sortedData = this.filterAnswersNQuestions(copy)


      let answerIds = this.state.reported

       sortedData[1].forEach((answer) => {
         answer.forEach(obj => {

           if (answerIds.includes(obj.id)) {
             obj.report = 'reported'
           } else {
             obj.report = 'report'
           }

         })

        this.setState({
          questions: sortedData[0],
          answers:sortedData[1],

        })
      })
    }

    if (prevState.qSearchCharCount !== this.state.qSearchCharCount) {

      if (this.state.qSearchCharCount >= 3) {
        this.searchFilter(this.state.questionSearchVal)
      }
    }
    if (this.state.question_id !== prevState.question_id) {

      this.setState({
        question_id:this.state.question_id
      })
    }

    if (prevProps.allClicksProps.question_id !== this.props.question_id) {

      if (this.props.helpfulQuestionCount === 1)  {
        updateHelpfulness(this.props.question_id)
          .then(data=>
            questions(this.props.product_id)
              .then(newData => {
                let sortedData = this.filterAnswersNQuestions(newData.data)
                let answerIds = this.state.reported

                sortedData[1].forEach((answer) => {
                  answer.forEach(obj => {
                    if (answerIds.includes(obj.id)) {

                      obj.report = 'reported'
                    } else {
                      obj.report = 'report'
                    }
                  })

                this.setState({
                  questions: sortedData[0],
                  answers: sortedData[1],
                  reported: answerIds,

                })
              })
            })
          )
      }
    }
    if (prevProps.allClicksProps.answerId !== this.props.answerId) {

      console.log(prevProps.allClicksProps.helpfulAnswerCount )
      console.log(this.props.helpfulAnswerCount)

      if (this.props.helpfulAnswerCount === 1) {
        updateAnswerHelpfulness(this.props.answerId)
          .then(data => {
            questions(this.props.product_id)
              .then(newData => {

                let sortedData = this.filterAnswersNQuestions(newData.data)

                let answerIds = this.state.reported.slice()

                sortedData[1].forEach((answer) => {

                  answer.forEach(obj => {

                    if (answerIds.includes(obj.id)) {
                      obj.report = 'reported'
                    } else {
                      obj.report = 'report'
                    }
                  })

                  this.setState({
                    questions: sortedData[0],
                    answers: sortedData[1],
                    reported: answerIds

                  })
                })
              })
          })

      }
    }

    if (prevState.questions.length !== this.state.questions.length) {
      let copy = this.props.data.slice()
      let sortedData= this.filterAnswersNQuestions(copy)

      let answerIds = this.state.reported
      sortedData[1].forEach((answer) => {

        answer.forEach(obj => {

          if (answerIds.includes(obj.id)) {
            obj.report = 'reported'
          } else {
            obj.report = 'report'
          }
        })

        this.setState({
          questions: sortedData[0],
          answers: sortedData[1],
          reported: answerIds
        })
      })
    }




    if(prevState.answers.length !== this.state.answers.length) {
      let sortedData = this.filterAnswersNQuestions(this.state.questions.slice())

      let answerIds = this.state.answers.slice()

      sortedData[1].forEach((answer) => {

        answer.forEach(obj => {

          if (answerIds.includes(obj.id)) {
            obj.report = 'reported'
          } else {
            obj.report = 'report'
          }
        })

        this.setState({

          answers: sortedData[1],
          questions: sortedData[0]

        })
      })
    }

    if (prevState.reported.length !== this.state.reported.length) {

      let answerIds = this.state.reported.slice()
      let answers = this.state.answers.slice()

      answers.forEach((answer) => {

        answer.forEach(obj => {

          if (answerIds.includes(obj.id)) {
            obj.report = 'reported'
          }
        })
      })

      this.setState({
        reported: this.state.reported,
        answers: answers
      })
    }
  }

  filterAnswersNQuestions(currentQuestions) {
    let filtered = helper.filterAll(currentQuestions)
    return filtered
  }


  searchFilter(searchValue) {
    let copy = this.state.questions.slice()
    let original = this.props.QuestionSavedData
    let newQuestions = helper.filterAll(original)

    if (this.state.qSearchCharCount >= 3 && searchValue.length <=2) {

      this.setState({
        questions: newQuestions[0],
        answers: newQuestions[1]
      })

    } else {

      let newQuestions = helper.filterSearchInput(copy, searchValue);
      let newQnA = helper.filterAll(newQuestions)

        this.setState({
          questions: newQnA[0],
          answers: newQnA[1]

        })
      }
  }



  showQuestions(currentCount, index) {
    let show = helper.showQuestionsClass(currentCount, index);
    return show
  }

  questionSearchChange(e) {
    let newCount = this.state.qSearchCharCount + 1

    this.setState({
      questionSearchVal: e.target.value,
      qSearchCharCount: newCount
    })
  }


  updateQuestions () {

    return questions(this.props.product_id)
      .then(data => {
        let questions = data.data
        let filtered = helper.filterAll(questions);


        this.setState({
          questions: filtered[0],
          answers: filtered[1],


        })
      })

  }

  addQuestion(e) {

    if (this.state.qFormShowOrHide === 'qForm') {
      this.setState({
        qFormShowOrHide: 'qFormHide'
      })
    } else {

      this.setState({
        qFormShowOrHide: 'qForm'
      })
    }
  }

  updateAnswers() {
    questions(this.props.product_id)
      .then(currentQuestions => {

        let sortedData= helper.filterAll(currentQuestions.data)
        let answerIds = this.state.reported

        sortedData[1].forEach((answer) => {

          answer.forEach(obj => {

            if (answerIds.includes(obj.id)) {
              obj.report = 'reported'
            } else {
              obj.report = 'report'
            }
          })

          this.setState({
            questions: sortedData[0],
            answers: sortedData[1],
            aFormShowOrHide: 'aFormHide',
            reported: answerIds
          })
        })
      })
  }


 addAnswerOnClick(e, arr) {

   this.setState({
    aFormShowOrHide: 'aForm',
    currentQuestion: arr[0],
    question_id: arr[1]

   })
 }

 addToReported(e, ansId) {
   addToReported(ansId)
     .then(data => {
       this.setState({
         reported: data
       })
     })
 }

  render () {



    return (
      <ClickTracker>
        {trackerProps => (
            <div className={`main container`}>

              <div className='title container row'>

                <h3 className='componentTitle'>Questions & Answers</h3>

                <Search
                  recordClick={trackerProps.recordClick}
                  currentInput={this.state.questionSearchVal}
                  questionSearchChange={this.questionSearchChange}
                />
              </div>

              <div className={this.state.qFormShowOrHide}>

                <UserQuestion
                  recordClick={trackerProps.recordClick}
                  currentItemName={this.props.currentItemName}
                  updateQuestions={this.updateQuestions}
                  qFormShowOrHide={this.state.qFormShowOrHide}
                  addQuestion={this.addQuestion}
                  product_id={this.props.product_id}
                />

              </div>
              <div className={this.state.aFormShowOrHide}>
                <UserAnswer
                  recordClick={trackerProps.recordClick}
                  currentItemName={this.props.currentItemName}
                  question_id={this.state.question_id}
                  updateAnswers={this.updateAnswers}

                  currentQuestion={this.state.currentQuestion}
                />

              </div>
              <div className='questionList scroll container'>
                <div className={''}>
                  {this.state.questions.map((question, index) => {
                  let currentClass;
                  let show = false;
                  if (this.props.allClicksProps.questionClickCount === 1 && index <= this.props.allClicksProps.questionClickCount) {
                    show = true
                  }
                  if (this.props.allClicksProps.questionClickCount >= 3 && index <= this.props.allClicksProps.questionClickCount) {
                    show = true

                  }
                  return <QuestionsContainer
                          answerState={this.props.allClicksProps.loadAnswerState}
                          loadAnswerState={this.props.allClicksProps.loadAnswerState}
                          recordClick={trackerProps.recordClick}
                          key={index}
                          addToReported={this.addToReported}
                          helpfulAnswerClick={this.props.allClicksProps.helpfulAnswerIndicatorClick}
                          helpfulQuestionClick={this.props.allClicksProps.helpfulQuestionIndicatorClick}
                          currentI={index}
                          showQuestions={this.showQuestions}
                          questionClickCount={this.props.allClicksProps.questionClickCount}
                          answers={this.state.answers[index]}
                          question={question}
                          addAnswerOnClick={this.addAnswerOnClick}
                          question_id={question.question_id}
                          show={show}
                        />
                  })}
                </div>
              </div>
              <div className='questionListButton container'>
                <div className='lButton'>
                  <h3 className={'loadMoreAnswersButton'}
                      onClick={(e) => {trackerProps.recordClick(e), this.props.allClicksProps.loadMoreAnsOrQ(e)}}>{this.props.allClicksProps.loadAnswerState ? 'Collapse Answers':'Load More Answers'}
                  </h3>
                </div>
                <div className='bottomButtons'>
                  <h3 className={this.props.allClicksProps.showQuestionButton? 'moreAnsweredBtn Hide' : 'moreAnsweredBtn'}
                          onClick={(e) => {this.props.allClicksProps.loadNewQuestions(this.state.questions.length - 1), trackerProps.recordClick(e)}}>MORE ANSWERED QUESTIONS
                  </h3>
                  <h3 className='addQuestionBtn' onClick={(e) => {trackerProps.recordClick(e), this.addQuestion()}}>ADD A QUESTION +</h3>
                </div>
              </div>

            </div>
        )}
      </ClickTracker>
    )
  }
}

QuestionsNAnswers.propTypes = {
  currentItemName: propTypes.string.isRequired,
  QuestionSavedData: propTypes.array.isRequired,
  product_id: propTypes.number.isRequired,
  data: propTypes.array.isRequired,
}

export default QuestionsNAnswers;