import React from 'react';
import {interactions} from '../clientRoutes/qa'
import propTypes from 'prop-types';


class ClickTracker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      interactions: [],


    }
    this.recordClick = this.recordClick.bind(this)
  }
  recordClick(e) {
    // console.log(new Date(e.timeStamp))

    let newResults =this.state.interactions.slice();
    if (newResults.length > 5) {
      console.log('ready to be sent')
      //send array of interactions to server to be posted
      return interactions(newResults)
        .then(data => {
          console.log(data, 'qa interactions data posted to API')
          this.setState({
            interactions:[]
          })
        })


    //reset state of interactions after ok response is received from server

    }
    console.log(e.target.className)
    let ele;
    if (e.target.className === 'moreAnsweredBtn') {
      ele = 'more answered questions button'
    }
    if (e.target.className === 'loadMoreAnswersButton') {
      ele = 'load more answers button'
    }
    if(e.target.className === 'addQuestionBtn') {
      ele = 'add a question button'
    }
    if(e.target.className === 'userReportBtn') {
      ele = 'report answer button'
    }
    if(e.target.className.includes('userHelpfulBtn')) {
      ele = 'answer helpful indicator'
    }
    if(e.target.className === 'qhelpfulIndicator') {
      ele = 'question helpful indicator'
    }
    if(e.target.className === 'addAnswerText') {
      ele = 'add answer button'
    }
    if(e.target.className === 'search') {
      ele = 'search bar'
    }
    if(e.target.className === 'userQuestion') {
      ele = 'add question form question text box'
    }
    if(e.target.className === 'userNickName') {
      ele = 'add question form nickname text box'
    }
    if(e.target.className === 'userEmail') {
      ele = 'add question form email text box'
    }
    if(e.target.className === 'userQSubmit') {
      ele = 'add question submit button'
    }
    if(e.target.className === 'addAnswerFormText') {
      ele = 'add answer form text box'
    }
    if(e.target.className === 'addAnswerFormNickName') {
      ele = 'add answer form nickname text box'
    }
    if(e.target.className === 'addAnswerFormEmail') {
      ele = 'add answer form email text box'
    }

    if(e.target.className === 'uploadButton') {
      ele = 'add answer form upload photo button'
    }
    if(e.target.className === 'addAnswersubmit') {
      ele = 'add answer form answer submit button'
    }
    if(e.target.className === 'checkbox1') {
      ele = 'add answer form answer photo confirm checkbox'
    }
    if(e.target.className === 'photoConfirmButton') {
      ele = 'add answer form photo confirm button'
    }
    if(e.target.className === 'photos') {
      ele = 'add answer form photo file change button'
    }
    let recordObj = {
      element: ele,
      widget: 'QA Widget',
      time: new Date(Date.now(e.target.timeStamp))

    }
    newResults.push(recordObj)
    this.setState({
      interactions: newResults
    })
  }
  render(){
    const renderProps = {

      recordClick: this.recordClick
    }
    return typeof this.props.children === 'function'
      ? this.props.children(renderProps)
      : this.props.children
  }

}

ClickTracker.propTypes = {
  children: propTypes.oneOfType([propTypes.func, propTypes.obj])

}

export default ClickTracker;