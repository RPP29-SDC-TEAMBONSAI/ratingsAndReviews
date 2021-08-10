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



    }
    this.moreAnsweredQorLoadMoreAnswers = this.moreAnsweredQorLoadMoreAnswers.bind(this)
    this.loadNewQuestions = this.loadNewQuestions.bind(this)

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.questionClickCount !== this.state.questionClickCount) {
      console.log('here')
      let showMoreAnsweredQuestions = helper.moreAnsweredQButtonDisplay(this.state.questionClickCount, this.state.lastIndex);
      console.log(showMoreAnsweredQuestions)
      this.setState({
        showQuestionButton: showMoreAnsweredQuestions
      })
    }
  }

  //componentDidUpdate that??
  //checks question count difference and runs function that determines if show button state should be updated?
  //use showQuestionButton as prop to show or hide more answered questions button


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


  render () {
    const renderProps = {
      loadAnswerState: this.state.loadAnswerState,
      questionClickCount: this.state.questionClickCount,
      lastIndex: this.state.lastIndex,
      showQuestionButton: this.state.showQuestionButton,
      loadMoreAnsOrQ: this.moreAnsweredQorLoadMoreAnswers,
      loadNewQuestions: this.loadNewQuestions,

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