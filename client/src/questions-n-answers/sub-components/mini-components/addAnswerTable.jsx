import React from 'react';
import propTypes from 'prop-types';

const AddAnswer = (props) => {

  return (
    <table className={`answerTable ${props.classname}`}>
      <tbody>
        <tr >
          <td className='aHelpful'>Helpful?</td>
          <td id={props.currentI.toString()} className='qhelpfulIndicator' onClick={(e) => {props.helpfulQuestionClick(e, props.question_id), props.recordClick(e)}}>Yes</td>
          <td className='helpfulCount'>({props.data ? props.data : 0})</td>
          <td className='addAnswerText' onClick={(e) => {props.addAnswerOnClick(e, [props.questionName, props.question_id], props.recordClick(e))}}>Add Answer</td>
        </tr>
      </tbody>
    </table>
  )
}

AddAnswer.propTypes ={
  addAnswerOnClick:propTypes.func.isRequired,
  questionName: propTypes.string.isRequired,
  currentI: propTypes.number.isRequired,
  question_id: propTypes.number.isRequired,
  helpfulQuestionClick: propTypes.func.isRequired,
  classname: propTypes.string.isRequired,
  data: propTypes.number.isRequired
}

export default AddAnswer



