import React from 'react';
import propTypes from 'prop-types';

const AddAnswer = (props) => {
  return (
    <div className='helpfulQuestion container'>
      <div className='helpulQuestion display'>
        <p className='aHelpful'>Helpful?</p>
        <p id={props.currentI.toString()} className='qhelpfulIndicator' onClick={(e) => {props.helpfulQuestionClick(props.question_id, props.currentI), props.recordClick(e)}}>Yes</p>
        <p className='helpfulCount'>({props.data ? props.data : 0})</p>
        <p className='addAnswerText' onClick={(e) => {props.addAnswerOnClick(props.questionName, props.question_id), props.recordClick(e)}}>Add Answer</p>
      </div>
    </div>
  )
}

AddAnswer.propTypes ={
  recordClick: propTypes.func.isRequired,
  addAnswerOnClick:propTypes.func.isRequired,
  questionName: propTypes.string.isRequired,
  currentI: propTypes.number.isRequired,
  question_id: propTypes.number.isRequired,
  helpfulQuestionClick: propTypes.func.isRequired,
  data: propTypes.number.isRequired
}

export default AddAnswer



