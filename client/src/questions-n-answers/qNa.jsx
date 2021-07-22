import React from 'react';
import Search from './sub-components/search.jsx'
import QuestionsAndAnswers from './sub-components/questionsAndAnswers.jsx';
import QnAClientHelpers from '../helpers/qnAHelper.js';

class QuestionsNAnswers extends React.Component {
  constructor(props) {
    super(props)


    this.state ={
      questions: []

    };

  }


  componentDidMount() {
    let helper = new QnAClientHelpers()

    // console.log(this.props.data)
    let copy = this.props.data.slice()
    let newOrder = helper.sortQuestions(copy)

    this.setState({
      questions: newOrder,
      questionHide: 'Hide'
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
            return <QuestionsAndAnswers key={index} classname={currentClass} data={question}/>
          })}
        </div>
        <div className='questionListButton container'>
          <h3 className='loadMoreAnswersButton'>Load more answers</h3>
          <button className='moreAnsweredBtn'>MORE ANSWERED QUESTIONS</button>
          <button className='addAQuestion'>ADD A QUESTION +</button>
        </div>
      </div>
    )
  }
}

export default QuestionsNAnswers;