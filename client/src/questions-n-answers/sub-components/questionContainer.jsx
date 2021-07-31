import React from 'react'
import AddAnswer from './mini-components/addAnswerTable.jsx';
import propTypes from 'prop-types';
import QuestionList from './mini-components/questionList.jsx';

const QuestionsContainer = (props) => {

  let showQuestionClass = props.showQuestions(props.questionCount, props.currentI)

  return (
    <div className={showQuestionClass ? ` qna ${showQuestionClass} Container `: `qna ${props.classname} Container`}>
      <div className='questionAndAnswer'>
        <QuestionList
          addToReported={props.addToReported}
          helpfulAnswerClick= {props.helpfulAnswerClick}
          answerHide={props.answerHide}
          addAnswerScroll={props.addAnswerScroll}
          answerTableHide={props.answerTableHide}
          question={props.question}
          currentI={props.currentI}
          answers={props.answers}
          questionCount={props.questionCount}
          answerCount={props.answerCount}
          classname={showQuestionClass ? showQuestionClass : props.classname}
        />
      </div>
      <div className='qna table'>
        <AddAnswer
          addAnswerOnClick={props.addAnswerOnClick}
          currentI={props.currentI}
          helpfulQuestionClick={props.helpfulQuestionClick}
          data={props.question.question_helpfulness}
          questionName={props.question.question_body}
          classname={showQuestionClass ? showQuestionClass : props.classname}
          question_id={props.question_id}

        />
      </div>
    </div>
  )
}

QuestionsContainer.propTypes = {
  addToReported:propTypes.func.isRequired,
  question_id: propTypes.number.isRequired,
  addAnswerOnClick: propTypes.func.isRequired,
  helpfulAnswerClick: propTypes.func.isRequired,
  helpfulQuestionClick: propTypes.func.isRequired,
  showQuestions: propTypes.func.isRequired,
  questionCount: propTypes.number.isRequired,
  answerCount: propTypes.number.isRequired,
  classname: propTypes.string.isRequired,
  currentI: propTypes.number.isRequired,
  answerHide: propTypes.func.isRequired,
  answerTableHide: propTypes.func.isRequired,
  addAnswerScroll: propTypes.func.isRequired,
  answers: propTypes.array.isRequired,
  question: propTypes.object.isRequired
}
export default QuestionsContainer;