import React from 'react'
import AddAnswer from './mini-components/addAnswerTable.jsx';
import propTypes from 'prop-types';
import QuestionList from './mini-components/questionList.jsx';


const QuestionsContainer = (props) => {

  let showQuestion= props.showQuestions(props.questionClickCount, props.currentI)

  let showScroll;
  if (props.currentI > 2 && showQuestion) {
    showScroll = 'scroll'
  }

  return (

    <div className={showQuestion?  'showQuestion': 'hide'}>
        <div className='qa row'>
        <h4 className='questionText'>Q: {props.question.question_body}</h4>
        <AddAnswer
            recordClick={props.recordClick}
            addAnswerOnClick={props.addAnswerOnClick}
            currentI={props.currentI}
            helpfulQuestionClick={props.helpfulQuestionClick}
            data={props.question.question_helpfulness}
            questionName={props.question.question_body}
            question_id={props.question_id}
          />
          </div>
        <div className={'questionList row'}>
          <QuestionList
            answerState={props.answerState}
            recordClick={props.recordClick}
            addToReported={props.addToReported}
            helpfulAnswerClick= {props.helpfulAnswerClick}
            question={props.question}
            answers={props.answers}
            showQuestion={props.showQuestion}
          />




      </div>

    </div>
  )
}

QuestionsContainer.propTypes = {
  answerState:propTypes.any.isRequired,
  recordClick:propTypes.func.isRequired,
  addToReported:propTypes.func.isRequired,
  question_id: propTypes.number.isRequired,
  addAnswerOnClick: propTypes.func.isRequired,
  helpfulAnswerClick: propTypes.func.isRequired,
  helpfulQuestionClick: propTypes.func.isRequired,
  showQuestions: propTypes.func.isRequired,
  questionClickCount: propTypes.number.isRequired,
  currentI: propTypes.number.isRequired,
  answers: propTypes.array.isRequired,
  question: propTypes.object.isRequired
}
export default QuestionsContainer;