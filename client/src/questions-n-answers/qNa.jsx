import React from 'react';
import Search from './sub-components/search.jsx'
import QuestionsAndAnswers from './sub-components/questionsAndAnswers.jsx';


const QuestionsNAnswers = (props) => {
  return (
    <div className='qNa'>

      <h3 className='qnaTitle'>Questions & answers</h3>
      <Search/>
      <QuestionsAndAnswers/>


    </div>

  );
}

export default QuestionsNAnswers;