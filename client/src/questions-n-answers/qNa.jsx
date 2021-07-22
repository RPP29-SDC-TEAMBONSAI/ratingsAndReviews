import React from 'react';
import Search from './sub-components/search.jsx'
import QuestionsAndAnswers from './sub-components/questionsAndAnswers.jsx';
import QnAClientHelpers from '../helpers/qnAHelper.js';

class QuestionsNAnswers extends React.Component {
  constructor(props) {
    super(props)


    this.state ={
      questions: [],
      answerClickCount: 0,
      questionClickCount: 1,
      questionHide: 'Hide',
      answerScroll: 'list scroll container',
      loadButtonText: 'Load More Answers'

    };
    this.loadAnswerClick = this.loadAnswerClick.bind(this)
    this.loadQuestionClick = this.loadQuestionClick.bind(this)

  }


  componentDidMount() {
    let helper = new QnAClientHelpers()

    // console.log(this.props.data)
    let copy = this.props.data.slice()
    let newOrder = helper.sortQuestions(copy)

    this.setState({
      questions: newOrder,

    })

  }

  loadAnswerClick(e) {
    let count = this.state.answerClickCount + 1;
    let text;

    if (count % 2 !== 0) {
      text = 'Collapse Answers'

    } else {
      text = 'Load More Answers'
    }

    this.setState({
      answerClickCount: count,
      loadButtonText: text
    })
  }

  loadQuestionClick(e) {
    let count = this.state.questionClickCount + 2
    this.setState({
      questionClickCount: count
    })


  }


  render () {
    return (
<div>
      <div className={`questionList container`}>
        <div className="questionListTitle container">
          <h3 className='qnaTitle'>Questions & answers</h3>
          <Search/>
        </div>
        <div className='list container'>
          {this.state.questions.map((question, index) => {
            let currentClass;
            if (index <= 1) {
              currentClass = 'questionText'

            } else {
              currentClass = this.state.questionHide
            }
            return <QuestionsAndAnswers key={index} currentI={index} answerScroll={this.state.answerScroll} questionCount={this.state.questionClickCount} answerCount={this.state.answerClickCount} classname={currentClass} data={question}/>
          })}
        </div>
        <div className='questionListButton container'>
          <h3 className='loadMoreAnswersButton' onClick={this.loadAnswerClick}>{this.state.loadButtonText}</h3>
          <button className='moreAnsweredBtn' onClick={this.loadQuestionClick}>MORE ANSWERED QUESTIONS</button>
          <button className='addAQuestion'>ADD A QUESTION +</button>
        </div>
      </div>
      </div>
    )
  }
}

export default QuestionsNAnswers;