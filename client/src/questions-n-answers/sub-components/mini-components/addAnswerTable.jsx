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
        <tbody>
          <tr>
            <td className='aHelpful'>Helpful?</td>
            <td className='qhelpfulIndicator'>Yes</td>
            <td className='helpfulCount'>({this.props.data ? this.props.data : 0})</td>
            <td className='addAnswerText'>Add Answer</td>
          </tr>
        </tbody>
      </table>
    )
  }
}



export default AddAnswer



