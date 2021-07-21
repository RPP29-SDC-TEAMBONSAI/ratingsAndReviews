import React from 'react';
import Search from './sub-components/search.jsx'
import QuestionsAndAnswers from './sub-components/questionsAndAnswers.jsx';


class QuestionsNAnswers extends React.Component {
  constructor(props) {
    super(props)

    this.state ={

    };

  }

  render () {
    return (

      <div className='questionList container'>
        <div className="questionListTitle container">
          <h3 className='qnaTitle'>Questions & answers</h3>
          <Search/>
        </div>
        <div className='list container'>
          {this.props.data.map((question, index) => {
            return <QuestionsAndAnswers key={index} data={question}/>
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