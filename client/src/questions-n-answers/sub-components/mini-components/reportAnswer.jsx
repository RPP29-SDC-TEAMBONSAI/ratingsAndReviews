import React from 'react';

class ReportAnswer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: 'theRealRob',
      date: 'May 1, 2019',
      answerHelpfulCount: 0

    }
  }

  render() {
    return (
      <table>
        <tr>
          <td className='userIdText'>by {this.state.user}, {this.state.date}</td>
          <td>helpful?</td>
          <td className='userHelpfulBtn'>Yes</td>
          <td className='userHelpIndicator'>({this.state.answerHelpfulCount})</td>
          <td className='userReportBtn'>report</td>
        </tr>
      </table>

    );
  }
}

export default ReportAnswer