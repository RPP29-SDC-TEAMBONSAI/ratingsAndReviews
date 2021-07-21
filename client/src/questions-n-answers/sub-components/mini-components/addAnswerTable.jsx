import React from 'react';

class AddAnswer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      questionHelpfulCount: 0

    }
  }
  render() {
    return (
      <table className='answerTable'>
        <tr>
          <td className='aHelpful'>Helpful?</td>
          <td className='qhelpfulIndicator'>Yes</td>
          <td className='helpfulCount'>({this.state.questionHelpfulCount})</td>
          <td className='addAnswerText'>Add Answer</td>
        </tr>
      </table>
    )
  }
}

export default AddAnswer

