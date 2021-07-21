import React from 'react';
import Search from './sub-components/search.jsx'
import QuestionsAndAnswers from './sub-components/questionsAndAnswers.jsx';


const QuestionsNAnswers = (props) => {
  return (

    <div className='questionList container'>
      <div className="questionListTitle container">
        <h3 className='qnaTitle'>Questions & answers</h3>
        <Search/>
      </div>
      <div className='list container'>
        {props.data.map((question, index) => {
          return <QuestionsAndAnswers key={index} data={question}/>
        })};
      </div>
      <div className='questionListButton container'>
        <button className='moreAnsweredBtn'>MORE ANSWERED QUESTIONS</button>
        <button className='addAQuestion'>ADD A QUESTION +</button>
      </div>
    </div>
  );
}

export default QuestionsNAnswers;