import React from 'react'
import AddAnswer from './mini-components/addAnswerTable.jsx';
// import ReportAnswer from './mini-components/reportAnswer.jsx';
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
            <AnswerNQuestion data={this.props.data}/>
          </div>
          <div className='qna table'>
            <AddAnswer data={this.props.data.question_helpfulness}/>
          </div>
        </div>
      </div>

    );
  }
}

export default QuestionsAndAnswers;