import React from 'react';
import propTypes from 'prop-types';
import AnswerImages from './answerImages.jsx';
import { format } from 'date-fns'

const QuestionList = (props) => {
  let showAns =false
  return (
    <div className={props.question.answers.length? 'answerList': 'hide'}>
      {props.question.answers.map((answer, index) => {

        if(props.showAns.length) {
          if (props.showAns.includes(props.currentQuestionI)) {
            showAns=true
          }
        }

        return (
          <div className={!showAns && index <=1 || showAns ? 'answer container': 'hide'} key={index}>
            <h4 className='answerText'>{answer.body}</h4>
            <div className='answerImage container'>
              {answer.photos.map((photo, index) => {
                return <AnswerImages key={index} photo={photo}/>
              })}
            </div>
            <div className='answererDetails'>
              <p className='userIdText'>by {answer.answerer_name}, {format(new Date(answer.date), 'MMMM dd, yyyy')}</p>
              <p className='answerHelpfulText'>helpful?</p>
              <p className='userHelpfulBtn' onClick={(e) => props.helpfulAnswerClick(answer.id)}>Yes</p>
              <p className='userHelpIndicator'>({answer.helpfulness})</p>
              <p className='userReportBtn' onClick={(e) => {props.addToReported(e, answer.id), props.recordClick(e)}}>{answer.report}</p>
            </div>
          </div>
        )
      })}
    <div className={props.question.answers.length > 2? 'loadMoreAnswerButton container': 'hide'}>
      <h3 className='loadMoreAnswersButton' onClick={(e) => props.loadMoreAnsOrQ(props.currentQuestionI)}>{showAns? 'Collapse Answers':'Load More Answers'}</h3>
      </div>
    </div>
  )
}

QuestionList.propTypes = {
  loadMoreAnsOrQ:propTypes.func.isRequired,
  showAns:propTypes.array.isRequired,
  currentQuestionI:propTypes.number.isRequired,
  recordClick: propTypes.func.isRequired,
  answerState: propTypes.any,
  helpfulAnswerClick:propTypes.func.isRequired,
  addToReported: propTypes.func.isRequired,
  answers: propTypes.array.isRequired,
  question: propTypes.object.isRequired
}

export default QuestionList