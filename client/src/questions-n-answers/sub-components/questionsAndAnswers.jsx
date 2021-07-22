import React from 'react'
import AddAnswer from './mini-components/addAnswerTable.jsx';
// import ReportAnswer from './mini-components/reportAnswer.jsx';
import QuestionList from './mini-components/questionList.jsx';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props)

    this.state = {


    }
    this.showQuestion = this.showQuestion.bind(this)

  }
  showQuestion(currentCount) {
    let newClass;
    // console.log(this.props)

    if (currentCount % 2 !== 0) {

      if (this.props.currentI <= currentCount) {
        newClass = 'questionText'
        // console.log('here')
      }


    }
    return newClass

  }


  render() {

    let showQuestionClass = this.showQuestion(this.props.questionCount)
    // this.props.showButton(this.props.currentI)


    // console.log(showQuestionClass)



    return (

      <div className={showQuestionClass ? ` qna ${showQuestionClass} Container `: `qna ${this.props.classname} Container`}>
        <div className='questionAndAnswer'>
          <QuestionList data={this.props.data} answerScroll={this.state.answerScroll} questionCount={this.props.questionCount} answerCount={this.props.answerCount} classname={showQuestionClass ? showQuestionClass : this.props.classname} />
        </div>
        <div className='qna table'>
          <AddAnswer data={this.props.data.question_helpfulness} classname={showQuestionClass ? showQuestionClass : this.props.classname}/>
        </div>

      </div>




    )
  }
}

export default QuestionsAndAnswers;