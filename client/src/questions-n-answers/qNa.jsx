import React from 'react';
import Search from './sub-components/search.jsx'
import QuestionsAndAnswers from './sub-components/questionsAndAnswers.jsx';
import QnAClientHelpers from '../helpers/qnAHelper.js';

class QuestionsNAnswers extends React.Component {
  constructor(props) {
    super(props)


    this.state ={
      questions: [],
      answerClickCount:0,
      questionHide: 'Hide',
      answerScroll: 'list scroll container'

    };
    this.loadAnswerClick = this.loadAnswerClick.bind(this)

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

    this.setState({
      answerClickCount: count
    })


  }


  render () {
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
            return <QuestionsAndAnswers key={index} answerScroll={this.state.answerScroll} answerCount={this.state.answerClickCount} classname={currentClass} data={question}/>
          })}
        </div>
        <div className='questionListButton container'>
          <h3 className='loadMoreAnswersButton' onClick={this.loadAnswerClick}>Load more answers</h3>
          <button className='moreAnsweredBtn'>MORE ANSWERED QUESTIONS</button>
          <button className='addAQuestion'>ADD A QUESTION +</button>
        </div>
      </div>
    )
  }
}

export default QuestionsNAnswers;