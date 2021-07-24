import React from 'React';
import propTypes from 'prop-types';

const QuestionList = (props) => {

  let scrollClass = props.addAnswerScroll(props.answerCount)

  return (
    <div>
      <h4 className={''}>Q: {props.question.question_body}</h4>
      <div className={scrollClass ? scrollClass : 'list container'}>

      {props.answers[props.currentI].map((answer, index) => {

        let _class= props.answerHide(props.classname, index)
        let showOrHideClass = props.answerTableHide(props.answerCount, index)
        let showClass;

        if (showOrHideClass === 'answerListTable') {

          showClass = 'answerListTable'
        }

        return (
          <div className={showClass ? showClass : _class} key={index}>
            <h4 className='answerText'>A: {answer.body}</h4>
            <table className=''key={index}>
              <tbody>
                  <tr>
                    <td className='userIdText'>by {answer.answerer_name}, {answer.date}</td>
                    <td>helpful?</td>
                    <td className='userHelpfulBtn'>Yes</td>
                    <td className='userHelpIndicator'>({answer.helpfulness})</td>
                    <td className='userReportBtn'>report</td>
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
  addAnswerScroll: propTypes.func.isRequired,
  answers: propTypes.array.isRequired,
  currentI: propTypes.number.isRequired,
  answerHide: propTypes.func.isRequired,
  answerTableHide: propTypes.func.isRequired,
  classname: propTypes.string.isRequired,
  answerCount: propTypes.number.isRequired,
  question: propTypes.string.isRequired

}

export default QuestionList