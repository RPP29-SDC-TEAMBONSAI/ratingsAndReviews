import React from 'react';
import Search from './sub-components/search.jsx'
import QuestionsContainer from './sub-components/questionContainer.jsx';
import helper from '../helpers/qnAHelper.js';
import UserQuestion from './sub-components/mini-components/userQuestion.jsx';
import propTypes from 'prop-types';
import UserAnswer from './sub-components/mini-components/userAnswer.jsx';
import {updateHelpfulness, questions, updateAnswerHelpfulness, addToReported, getReportedAns} from '../clientRoutes/qa';
import ClickTracker from './tracker.jsx'

class QuestionsNAnswers extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
      questions: [],
      answers: [],
      showQuestionButton: false,
      questionSearchVal: 'HAVE A QUESTION? SEARCH FOR ANSWERS...',
      qSearchCharCount: 0,
      reported: []
    };

    this.searchFilter = this.searchFilter.bind(this)
    this.filterAnswersNQuestions = this.filterAnswersNQuestions.bind(this)
    this.questionSearchChange = this.questionSearchChange.bind(this)
    this.showQuestions = this.showQuestions.bind(this)
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

    if (prevProps.data.length !== this.props.data.length) {
      let sortedData = this.filterAnswersNQuestions(copy)
      let answerIds = this.state.reported.slice()
      let newAnswers = helper.addReportedProp(sortedData[1], answerIds)

      this.setState({
        questions: sortedData[0],
        answers:newAnswers,
      })
    }

    if (prevState.qSearchCharCount !== this.state.qSearchCharCount) {
      if (this.state.qSearchCharCount >= 3) {
        this.searchFilter(this.state.questionSearchVal)
      }
    }
    //new question helpfulness
    if (prevProps.allClicksProps.question_id !== this.props.allClicksProps.question_id) {
      // console.log(this.props.allClicksProps.question_id)
      updateHelpfulness(this.props.allClicksProps.question_id)
        .then(data=>
          questions(this.props.product_id)
            .then(newData => {
              let sortedData = this.filterAnswersNQuestions(newData.data)
              let answerIds = this.state.reported.slice()
              let newAnswers = helper.addReportedProp(sortedData[1], answerIds)

              this.setState({
                questions: sortedData[0],
                answers: newAnswers,
                reported: answerIds,
              })
            })
        )
    }
    //new answer helpfulness
    if (prevProps.allClicksProps.answerId !== this.props.allClicksProps.answerId) {
      updateAnswerHelpfulness(this.props.allClicksProps.answerId)
        .then(data => {
          questions(this.props.product_id)
            .then(newData => {
              let sortedData = this.filterAnswersNQuestions(newData.data)
              let answerIds = this.state.reported.slice()
              let newAnswers = helper.addReportedProp(sortedData[1], answerIds)

              this.setState({
                questions: sortedData[0],
                answers: newAnswers,
                reported: answerIds
              })
            })
        })
    }

    if (prevState.questions.length !== this.state.questions.length) {
      let copy = this.props.data.slice()
      let sortedData= this.filterAnswersNQuestions(copy)
      let answerIds = this.state.reported.slice()
      let newAnswers = helper.addReportedProp(sortedData[1], answerIds)

      this.setState({
        questions: sortedData[0],
        answers: newAnswers,
        reported: answerIds
      })
    }

    if(prevState.answers.length !== this.state.answers.length) {
      let sortedData = this.filterAnswersNQuestions(this.state.questions.slice())
      let answerIds = this.state.answers.slice()
      let newAnswers = helper.addReportedProp(sortedData[1], answerIds)

      this.setState({
        answers: newAnswers,
        questions: sortedData[0]
      })
    }

    if (prevState.reported.length !== this.state.reported.length) {
      let answerIds = this.state.reported.slice()
      let answers = this.state.answers.slice()
      let newAnswers = helper.addReportedProp(answers, answerIds)

      this.setState({
        reported: this.state.reported.slice(),
        answers: newAnswers
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

  updateAnswers() {
    questions(this.props.product_id)
      .then(currentQuestions => {
        let sortedData= helper.filterAll(currentQuestions.data)
        let answerIds = this.state.reported.slice()
        let newAnswers = helper.addReportedProp(sortedData[1], answerIds)

        this.setState({
          questions: sortedData[0],
          answers: newAnswers,
          aFormShowOrHide: 'aFormHide',
          reported: answerIds
        })
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
            <div className='mainQnA container'>

              <div className='title container row'>
                <h3 className='componentTitle'>Questions & Answers</h3>
                <Search
                  recordClick={trackerProps.recordClick}
                  currentInput={this.state.questionSearchVal}
                  questionSearchChange={this.questionSearchChange}
                />
              </div>

              <div className={this.props.allClicksProps.QuestionFormDisplayClass}>
                <UserQuestion
                  recordClick={trackerProps.recordClick}
                  currentItemName={this.props.currentItemName}
                  updateQuestions={this.updateQuestions}
                  addQuestion={this.props.allClicksProps.addQuestion}
                  product_id={this.props.product_id}
                  QuestionFormDisplayClass={this.props.allClicksProps.QuestionFormDisplayClass}
                  closeQuestionForm={this.props.allClicksProps.closeQuestionForm}
                />
              </div>

              <div className={this.props.allClicksProps.answerFormDisplayClass}>
                <UserAnswer
                  recordClick={trackerProps.recordClick}
                  currentItemName={this.props.currentItemName}
                  updateAnswers={this.updateAnswers}
                  currentQuestion={this.props.allClicksProps.currentQuestion}
                  answerFormDisplayClass={this.props.allClicksProps.answerFormDisplayClass}
                  closeAnswerForm={this.props.allClicksProps.closeAnswerForm}
                  aFormQuestion_id={this.props.allClicksProps.aFormQuestion_id}
                />
              </div>

              <div className='questionList scroll container'>
                <div className={''}>
                  {this.state.questions.map((question, index) => {
                    let show = false;

                    if (this.props.allClicksProps.questionClickCount === 1 && index <= this.props.allClicksProps.questionClickCount) {
                      show = true
                    }

                    if (this.props.allClicksProps.questionClickCount >= 3 && index <= this.props.allClicksProps.questionClickCount) {
                      show = true
                    }

                    return (
                      <QuestionsContainer
                            answerState={this.props.allClicksProps.loadAnswerState}
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
                            addAnswerOnClick={this.props.allClicksProps.addAnswerOnClick}
                            question_id={question.question_id}
                            show={show}
                      />
                  )})}
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
                  <h3 className='addQuestionBtn' onClick={(e) => {trackerProps.recordClick(e), this.props.allClicksProps.addQuestion()}}>ADD A QUESTION +</h3>
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
  allClicksProps: propTypes.any
}

export default QuestionsNAnswers;