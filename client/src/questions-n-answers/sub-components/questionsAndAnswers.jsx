import React from 'react'
import AddAnswer from './mini-components/addAnswerTable.jsx';
// import ReportAnswer from './mini-components/reportAnswer.jsx';
import QuestionList from './mini-components/questionList.jsx';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props)

    this.state = {


    }
  }


  render() {


    return (
      <div>
        <div className={`qna container ${this.props.classname}`}>
          <div className='questionAndAnswer'>
            <QuestionList data={this.props.data} classname={this.props.classname} />
          </div>
          <div className='qna table'>
            <AddAnswer data={this.props.data.question_helpfulness} classname={this.props.classname}/>
          </div>

        </div>

      </div>

    )
  }
}

export default QuestionsAndAnswers;