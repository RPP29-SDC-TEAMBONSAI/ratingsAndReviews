import React from 'React';

class AnswerNQuestion extends React.Component {
  constructor(props) {
    super(props)


    this.state = {

    }
  }

  render() {
    let answers=[]
    let singleAnswers = []


    // console.log(this.props.data)

    if (Object.keys(this.props.data.answers).length) {
      for (var key in this.props.data.answers) {
        // answers.push(this.props.data.answers)
        answers.push(this.props.data.answers[key])
        // console.log(this.props.data.answers[key])
        // for (var key2 in this.props.data.answers[key]) {
        //   console.log(this.props.)
        // }

      }




    }
    // if (answers[0] === undefined) {
    //   answers = {body: 'none'}
    // }
    // console.log(answers, "🔥")



    return (
      <div className=''>
        <h4 className='questionText'>Q: {this.props.data.question_body}</h4>
        {answers.map((answer, index) => {
          return (
          <div className='' key={index}>
          <h4 className='answerText'>A: {answer.body}</h4>
            <table className=''key={index}>
            <tr className='userIdText container'>
              <td className='userIdText'>by {answer.answerer_name}, {answer.date}</td>
              <td>helpful?</td>
              <td className='userHelpfulBtn'>Yes</td>
              <td className='userHelpIndicator'>({answer.helpfulness})</td>
              <td className='userReportBtn'>report</td>
            </tr>
          </table>
        </div> )
        })}

      </div>
    )
  }
}


export default AnswerNQuestion