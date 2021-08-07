import React from 'react';
import propTypes from 'prop-types';
class AllClicks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadAnswerState: false,


    }
    this.moreAnsweredQorLoadMoreAnswers = this.moreAnsweredQorLoadMoreAnswers.bind(this)
  }
  moreAnsweredQorLoadMoreAnswers(e, currentAnswerShowState) {
    if (e.target.className === 'loadMoreAnswersButton') {
      this.setState({
        loadAnswerState: !this.state.loadAnswerState
      })
    }

  }
  render () {
    const renderProps = {
      loadAnswerState: this.state.loadAnswerState,
      loadMoreAnsOrQ: this.moreAnsweredQorLoadMoreAnswers
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