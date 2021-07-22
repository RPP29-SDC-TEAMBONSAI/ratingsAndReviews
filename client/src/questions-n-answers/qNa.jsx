import React from 'react';
import Search from './sub-components/search.jsx'
import QuestionsAndAnswers from './sub-components/questionsAndAnswers.jsx';
import QnAClientHelpers from '../helpers/qnAHelper.js';

class QuestionsNAnswers extends React.Component {
  constructor(props) {
    super(props)
    // console.log(this.props)


    this.state ={
      questions: [],
      answerClickCount: 0,
      questionClickCount: 1,
      questionHide: 'Hide',
      answerScroll: 'list scroll container',
      loadButtonText: 'Load More Answers',
      showQuestionButton: false,
      lastIndex : null


    };
    this.loadAnswerClick = this.loadAnswerClick.bind(this)
    this.loadQuestionClick = this.loadQuestionClick.bind(this)
    this.showButton = this.showButton.bind(this)

  }


  componentDidMount() {
    // console.log(this.props)
    let helper = new QnAClientHelpers()

    let showButton;

    if (this.props.data.length) {
      showButton = true;
    } else {
      showButton = false
    }

    // console.log(this.props.data)
    let copy = this.props.data.slice()
    let newOrder = helper.sortQuestions(copy)

    this.setState({
      questions: newOrder,
      showQuestionButton: showButton

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
    let lastI = this.state.questions.length - 1

    this.setState({
      questionClickCount: count,
      lastIndex: lastI
    })



  }

  showButton() {
    let newClass;
    if (this.state.showQuestionButton) {
      newClass = 'moreAnsweredBtn'

    }
    console.log(this.state.questionClickCount)

    if (this.state.questionClickCount - 1  === this.state.lastIndex) {
      console.log('hi')
      newClass = 'moreAnswerBtn Hide'
    }
    return newClass
  }


  render () {
    let showButtonClass = this.showButton()
    return (


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
            return <QuestionsAndAnswers key={index} currentI={index} showButton={this.showButton} lastI={this.state.lastIndex} answerScroll={this.state.answerScroll} questionCount={this.state.questionClickCount} answerCount={this.state.answerClickCount} classname={currentClass} data={question}/>
          })}
        </div>
        <div className='questionListButton container'>
          <h3 className={showButtonClass ? showButtonClass : 'moreAnsweredBtn Hide'}  onClick={this.loadAnswerClick}>{this.state.loadButtonText}</h3>
          <button className={showButtonClass ? showButtonClass : 'moreAnsweredBtn Hide'} onClick={this.loadQuestionClick}>MORE ANSWERED QUESTIONS</button>
          <button className='moreAnsweredBtn'>ADD A QUESTION +</button>
        </div>
      </div>

    )
  }
}

export default QuestionsNAnswers;