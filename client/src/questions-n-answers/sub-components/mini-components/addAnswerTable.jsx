import React from 'react';
import propTypes from 'prop-types';


class AddAnswer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      questionHelpfulCount: 0

    }
  }
  render() {
    return (
      <table className={`answerTable ${this.props.classname}`}>
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

AddAnswer.propTypes ={
  classname: propTypes.string.isRequired,
  data: propTypes.array.isRequired
}



export default AddAnswer



