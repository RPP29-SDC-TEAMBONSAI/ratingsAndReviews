import React from 'react';
import propTypes from 'prop-types';
import AnswerImages from './answerImages.jsx';



const QuestionList = (props) => {

  return (
    <div>
      <div className={'questionText container'}>
        <h4 className={'questionText'}>Q: {props.question.question_body}</h4>
      </div>
      <div className={props.answerState? 'answerListScroll': ''}>

      {props.answers.map((answer, index) => {

        return (
          <div className={!props.answerState && index <=1 || props.answerState ? 'answerList': 'answerList hide'} key={index}>
            <h4 className={`answerText`}>A: {answer.body}</h4>
            <div className='answerImage container'>
              {answer.photos.map((photo, index) => {
                return <AnswerImages key={index} photo={photo}/>
              })}
            </div>
            <table className='answererDetails'>
              <tbody >
                  <tr>
                    <td className='userIdText'>by {answer.answerer_name}, {answer.date}</td>
                    <td>helpful?</td>
                    <td className={`userHelpfulBtn ${props.currentI.toString()}`}  onClick={(e) => {props.helpfulAnswerClick(e, answer.id), props.recordClick(e)}} >Yes</td>
                    <td className='userHelpIndicator'>({answer.helpfulness})</td>
                    <td className='userReportBtn' onClick={(e) => {props.addToReported(e, answer.id), props.recordClick(e)}}>{answer.report}</td>
                  </tr>
              </tbody>
            </table>


          </div>
        )

      })}
      </div>
    </div>
  )
}

QuestionList.propTypes = {
  recordClick: propTypes.func.isRequired,
  answerState: propTypes.any,
  helpfulAnswerClick:propTypes.func.isRequired,
  currentI: propTypes.number.isRequired,
  addToReported: propTypes.func.isRequired,
  answers: propTypes.array.isRequired,
  currentI: propTypes.number.isRequired,
  question: propTypes.object.isRequired
}

export default QuestionList