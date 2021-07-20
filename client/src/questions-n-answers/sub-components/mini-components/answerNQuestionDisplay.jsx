import React from 'React';

class AnswerNQuestion extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div>
        <h4 className='questionText'>Q: This is a random test question?</h4>
        <h4 className='answerText'>A: Honestly this review wont make any sense beacuse its in response to a question that makes no sense!</h4>
      </div>
    )
  }
}


export default AnswerNQuestion