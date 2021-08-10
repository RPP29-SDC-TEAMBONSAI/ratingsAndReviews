import React from 'react';
import propTypes from 'prop-types';
import helper from '../helpers/qnAHelper.js'
class AllClicks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadAnswerState: false,
      questionClickCount: 1,
      lastIndex:null,
      showQuestionButton: false,
      helpfulQuestionCount: 0,
      question_id: null,
      answerId: null,
      helpfulAnswerCount: 0,
      clickedHQuestions: [],
      clickedHAnswers:[]



    }
    this.moreAnsweredQorLoadMoreAnswers = this.moreAnsweredQorLoadMoreAnswers.bind(this)
    this.loadNewQuestions = this.loadNewQuestions.bind(this)
    this.helpfulQuestionIndicatorClick = this.helpfulQuestionIndicatorClick.bind(this)
    this.helpfulAnswerIndicatorClick = this.helpfulAnswerIndicatorClick.bind(this)
    this.resetQuestionCount =  this.resetQuestionCount.bind(this)

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.questionClickCount !== this.state.questionClickCount) {
      let showMoreAnsweredQuestions = helper.moreAnsweredQButtonDisplay(this.state.questionClickCount, this.state.lastIndex);
      this.setState({
        showQuestionButton: showMoreAnsweredQuestions
      })
    }
  }


  moreAnsweredQorLoadMoreAnswers(e) {
    if (e.target.className === 'loadMoreAnswersButton') {
      this.setState({
        loadAnswerState: !this.state.loadAnswerState
      })
    }
  }
  loadNewQuestions(questionLength){
    let count = this.state.questionClickCount + 2
    let lastI = questionLength
    this.setState({
      questionClickCount: count,
      lastIndex: lastI
    })

  }
  helpfulQuestionIndicatorClick(questionId, index) {

    if (!this.state.clickedHQuestions.includes(questionId)) {
      let copy = this.state.clickedHQuestions.slice()
      copy.push(questionId)
      this.setState({
        helpfulQuestionCount: 1,
        question_id: questionId,
        clickedHQuestions:copy
      })
    }


  }
  helpfulAnswerIndicatorClick(answerId) {

    if (!this.state.clickedHAnswers.includes(answerId)) {
      let copy = this.state.clickedHAnswers.slice()
      copy.push(answerId)
        this.setState({
          helpfulAnswerCount: 1,
          answerId: answerId,
          clickedHAnswers: copy
        })

    }
  }

  resetQuestionCount() {
    this.setState({
      helpfulQuestionCount:0
    })
  }


  render () {
    const renderProps = {
      loadAnswerState: this.state.loadAnswerState,
      questionClickCount: this.state.questionClickCount,
      lastIndex: this.state.lastIndex,
      showQuestionButton: this.state.showQuestionButton,
      helpfulQuestionCount: this.state.helpfulQuestionCount,
      question_id: this.state.question_id,
      answerId: this.state.answerId,
      helpfulAnswerCount: this.state.helpfulAnswerCount,
      loadMoreAnsOrQ: this.moreAnsweredQorLoadMoreAnswers,
      loadNewQuestions: this.loadNewQuestions,
      helpfulQuestionIndicatorClick: this.helpfulQuestionIndicatorClick,
      helpfulAnswerIndicatorClick: this.helpfulAnswerIndicatorClick,
      resetQuestionCount: this.resetQuestionCount
    }

    return typeof this.props.children === 'function'
    ? this.props.children(renderProps)
    : this.props.children
  }

}

AllClicks.propTypes = {
  children: propTypes.oneOfType([propTypes.func, propTypes.obj])

}
export default AllClicks;