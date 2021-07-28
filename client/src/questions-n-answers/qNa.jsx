import React from 'react';
import Search from './sub-components/search.jsx'
import QuestionsContainer from './sub-components/questionContainer.jsx';
import QnAClientHelpers from '../helpers/qnAHelper.js';
import UserQuestion from './sub-components/mini-components/userQuestion.jsx';
import propTypes from 'prop-types';
import UserAnswer from './sub-components/mini-components/userAnswer.jsx';
import axios from 'axios';
import {updateHelpfulness, questions, updateAnswerHelpfulness, answers} from '../clientRoutes/qa';

class QuestionsNAnswers extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
      questions: [],
      answers: [],
      answerClickCount: 0,
      questionClickCount: 1,
      questionHide: 'Hide',
      answerScroll: 'list scroll container',
      loadButtonText: 'Load More Answers',
      showQuestionButton: false,
      lastIndex : null,
      answerHiddenClass: '',
      questionSearchVal: 'HAVE A QUESTION? SEARCH FOR ANSWERS...',
      qSearchCharCount: 0,
      helpfulQuestionCount: 0,
      question_id: null,
      helpfulAnswerCount: 0,
      answer_id: 0,
      answerHelpfulnessCount: 0,
      qFormShowOrHide: 'qFormHide',
      aFormShowOrHide: 'aFormHide',
      currentQuestion:'',
      current_id: 0


    };

    this.loadAnswerClick = this.loadAnswerClick.bind(this)
    this.loadQuestionClick = this.loadQuestionClick.bind(this)
    this.showButton = this.showButton.bind(this)
    this.showScrollContainer = this.showScrollContainer.bind(this)
    this.searchFilter = this.searchFilter.bind(this)
    this.filterAnswersNQuestions = this.filterAnswersNQuestions.bind(this)
    this.answerHide = this.answerHide.bind(this)
    this.answerTableHide = this.answerTableHide.bind(this)
    this.addAnswerScroll = this.addAnswerScroll.bind(this)
    this.showQuestions = this.showQuestions.bind(this)
    this.helper = this.helper.bind(this)
    this.questionSearchChange = this.questionSearchChange.bind(this)
    this.helpfulQuestionClick = this.helpfulQuestionClick.bind(this)
    this.helpfulAnswerClick = this.helpfulAnswerClick.bind(this)
    this.updateQuestions = this.updateQuestions.bind(this)
    this.addQuestion = this.addQuestion.bind(this)
    this.updateAnswers = this.updateAnswers.bind(this)
    this.addAnswer = this.addAnswer.bind(this)
    this.addAnswerOnClick = this.addAnswerOnClick.bind(this)


  }

  componentDidUpdate(prevProps, prevState) {
    let copy = this.props.data.slice()

    if (prevProps.data.length !== this.props.data.length) {

      let sortedData = this.filterAnswersNQuestions(copy)
      let showButton = this.helper().showMoreAnsweredQuestions(sortedData)

      this.setState({
        questions: sortedData[0],
        answers:sortedData[1],
        showQuestionButton: showButton,

      })
    }
    if (prevState.qSearchCharCount !== this.state.qSearchCharCount) {

      if (this.state.qSearchCharCount >= 3) {
        this.searchFilter(this.state.questionSearchVal)
      }
    }

    if(prevState.helpfulQuestionCount !== this.state.helpfulQuestionCount) {

      if (this.state.helpfulQuestionCount === 1) {
        this.setState({
          helpfulQuestionCount:0
        })
        updateHelpfulness(this.state.question_id)
          .then(data=>
            questions(this.props.product_id)
              .then(newData => {
                this.setState({
                  questions: newData.data

                })
              })

          )
      }
    }

    if (prevState.answerHelpfulnessCount !== this.state.answerHelpfulnessCount) {

      if (this.state.answerHelpfulnessCount === 1) {
        this.setState({
          answerHelpfulnessCount:0
        })
        updateAnswerHelpfulness(this.state.answer_id)
          .then(data => {
            questions(this.props.product_id)
              .then(newData => {
                let filtered =this.filterAnswersNQuestions(newData.data)
                console.log(filtered)
                this.setState({
                  answers: filtered[1]
                })
              })
          })
      }
    }
  }


  helper() {
    return new QnAClientHelpers()
  }



  filterAnswersNQuestions(currentQuestions) {
    let filtered = this.helper().filterAll(currentQuestions)
    return filtered
  }

  loadAnswerClick(e) {
    let count = this.state.answerClickCount + 1;
    let text = this.helper().loadAnswerButtonText(count)
    this.setState({
      answerClickCount: count,
      loadButtonText: text
    })
  }

  loadQuestionClick(e) {
    let count = this.state.questionClickCount + 2
    let lastI = this.state.questions.length - 1
    this.setState({
      questionClickCount: count,
      lastIndex: lastI
    })
  }

  showButton() {
    let newClass = this.helper().showMoreAnsweredBtnClass(this.state.showQuestionButton, this.state.questionClickCount, this.state.lastIndex);
    return newClass
  }

  showScrollContainer() {
    let newClass = this.helper().qListScrollClass(this.state.questionClickCount);
    return newClass
  }

  searchFilter(searchValue) {
    let copy = this.state.questions.slice()
    let original = this.props.QuestionSavedData
    let newQuestions = this.helper().filterAll(original)


    if (this.state.qSearchCharCount >= 3 && searchValue.length <=2) {

      this.setState({
        questions: newQuestions[0],
        answers: newQuestions[1]
      })

    } else {

      let newQuestions = this.helper().filterSearchInput(copy, searchValue);
      let newQnA = this.helper().filterAll(newQuestions)

        this.setState({
          questions: newQnA[0],
          answers: newQnA[1]

        })
      }
  }

  answerHide (classname, index) {
    let newClass = this.helper().answerHideClass(classname, index);
    return newClass
  }

  answerTableHide(currentCount, i) {
    let newClass = this.helper().answerTableHideClass(currentCount, i)
    return newClass
  }

  addAnswerScroll(currentCount) {
    let  newClass = this.helper().answerScrollClass(currentCount);
    return newClass
  }

  showQuestions(currentCount, index) {
    let newClass = this.helper().showQuestionsClass(currentCount, index);
    return newClass
  }

  questionSearchChange(e) {
    let newCount = this.state.qSearchCharCount + 1

    this.setState({
      questionSearchVal: e.target.value,
      qSearchCharCount: newCount
    })
  }

  helpfulQuestionClick(e) {

    let currentQuestion = Object.assign({}, this.state.questions[e.target.id])
    let question_id = currentQuestion.question_id
    if (this.state.question_id !== question_id) {
      this.setState({
        helpfulQuestionCount: 1,
        question_id:question_id
      })
    }
  }

  helpfulAnswerClick(e, body, cAnswer) {

    if (this.state.answer_id !== body) {
      this.setState({
        answer_id: body,
        answerHelpfulnessCount: 1
      })
    }
  }

  updateQuestions (questions) {
    let filtered = this.helper().filterAll(questions);
    console.log(filtered, "🤙")
    this.setState({
      questions: filtered[0],
      answers: filtered[1]
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
        console.log(currentQuestions)
        let filter= this.helper().filterAll(currentQuestions.data)
        this.setState({
          questions: filter[0],
          answers: filter[1],
          aFormShowOrHide: 'aFormHide'
        })
      })

  }

 addAnswer() {

 }
 addAnswerOnClick(e, arr) {


   this.setState({
    aFormShowOrHide: 'aForm',
    currentQuestion: arr[0],
    question_id: arr[1]

   })


 }

  render () {
    let showButtonClass = this.showButton()
    let scrollContainerClass = this.showScrollContainer()

    return (

      <div className={`questionList container`}>
        <div className="questionListTitle container">
          <h3 className='qnaTitle'>Questions & answers</h3>
          <Search
            currentInput={this.state.questionSearchVal}
            questionSearchChange={this.questionSearchChange}
          />
        </div>

        <div className={this.state.qFormShowOrHide}>

          <UserQuestion
            currentItemName={this.props.currentItemName}
            updateQuestions={this.updateQuestions}
            qFormShowOrHide={this.state.qFormShowOrHide}
            // addQuestion={this.addQuestion}
          />

        </div>
        <div className={this.state.aFormShowOrHide}>
          <UserAnswer
            currentItemName={this.props.currentItemName}
            question_id={this.state.question_id}
            updateAnswers={this.updateAnswers}
            addAnswer={this.addAnswer}
            currentQuestion={this.state.currentQuestion}
          />

        </div>
        <div className={scrollContainerClass? scrollContainerClass : 'questionList container'}>
          <div className={`List container`}>
            {this.state.questions.map((question, index) => {

              let currentClass;
              if (index <= 1) {
                currentClass = 'questionText'

              } else {
                currentClass = this.state.questionHide
              }
              return <QuestionsContainer
                      key={index}
                      helpfulAnswerClick={this.helpfulAnswerClick}
                      helpfulQuestionClick={this.helpfulQuestionClick}
                      currentI={index}
                      showQuestions={this.showQuestions}
                      addAnswerScroll={this.addAnswerScroll}
                      answerTableHide={this.answerTableHide}
                      answerHide={this.answerHide}
                      showButton={this.showButton}
                      lastI={this.state.lastIndex}
                      answerScroll={this.state.answerScroll}
                      questionCount={this.state.questionClickCount}
                      answerCount={this.state.answerClickCount}
                      classname={currentClass}
                      answers={this.state.answers[index]}
                      question={question}
                      addAnswerOnClick={this.addAnswerOnClick}
                      question_id={question.question_id}
                    />
            })}
          </div>
        </div>
        <div className='questionListButton container'>
          <h3 className={'loadMoreAnswersButton'}
              onClick={this.loadAnswerClick}>{this.state.loadButtonText}
          </h3>
          <button className={showButtonClass ? showButtonClass : 'moreAnsweredBtn Hide'}
                  onClick={this.loadQuestionClick}>MORE ANSWERED QUESTIONS
          </button>
          <button className='moreAnsweredBtn' onClick={this.addQuestion}>ADD A QUESTION +</button>
        </div>

      </div>
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