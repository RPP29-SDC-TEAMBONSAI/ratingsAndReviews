import React from 'react'
import AddAnswer from './mini-components/addAnswerTable.jsx';
import ReportAnswer from './mini-components/reportAnswer.jsx';
import AnswerNQuestion from './mini-components/answerNQuestionDisplay.jsx';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props)

    this.state = {


    }
  }

  render() {
    return (
      <div>
        <div className='qna container'>
          <div className='questionAndAnswer'>
            <AnswerNQuestion/>
          </div>
          <div className='qna table'>
            <AddAnswer/>
          </div>
        </div>
        <div className='reportAnswer'>
          <ReportAnswer/>
        </div>
        <div className='button container'>
          <button className='moreAnsweredBtn'>MORE ANSWERED QUESTIONS</button>
          <button className='addAQuestion'>ADD A QUESTION +</button>

        </div>
      </div>

    );
  }
}

export default QuestionsAndAnswers;