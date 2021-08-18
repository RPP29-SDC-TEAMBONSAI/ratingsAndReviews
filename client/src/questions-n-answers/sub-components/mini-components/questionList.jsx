import React from 'react';
import propTypes from 'prop-types';
import AnswerImages from './answerImages.jsx';
import { format } from 'date-fns'

const QuestionList = (props) => {
  return (
    <div className={props.answerState ? 'questionList scroll container':'questionList container'}>

      {props.question.answers.map((answer, index) => {

        return (
          <div className={!props.answerState && index <=1 || props.answerState ? 'answerList scroll': 'hide'} key={index}>
            <h4 className='answerText'>A: {answer.body}</h4>

            {answer.photos.map((photo, index) => {
              return <AnswerImages key={index} photo={photo}/>
            })}

            <div className='answererDetails'>
              <p className='userIdText'>by {answer.answerer_name}, {format(new Date(answer.date), 'EEEE MMMM dd, yyyy')}</p>
              <p className='answerHelpfulText'>helpful?</p>
              <p className='userHelpfulBtn' onClick={(e) => props.helpfulAnswerClick(answer.id)}>Yes</p>
              <p className='userHelpIndicator'>({answer.helpfulness})</p>
              <p className='userReportBtn' onClick={(e) => {props.addToReported(e, answer.id), props.recordClick(e)}}>{answer.report}</p>
            </div>
          </div>
        )
      })}

    </div>


  )
}

QuestionList.propTypes = {
  recordClick: propTypes.func.isRequired,
  answerState: propTypes.any,
  helpfulAnswerClick:propTypes.func.isRequired,
  addToReported: propTypes.func.isRequired,
  answers: propTypes.array.isRequired,
  question: propTypes.object.isRequired
}

export default QuestionList