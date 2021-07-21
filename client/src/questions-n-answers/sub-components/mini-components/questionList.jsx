import React from 'React';


class QuestionList extends React.Component {
  constructor(props) {
    super(props)



    this.state = {

    }
  }



  render() {
    let answers=[]
    //is this best way for getting answers??? probably not

    //* the question results came in as an array of objects - but the answers came in as a nested object
    //so in order to associate the create answers with the correct questions, without having to make
    //another request to db, i pulled all the answers with the below functionality and pushed them to an array.
    if (Object.keys(this.props.data.answers).length) {
      for (var key in this.props.data.answers) {
        answers.push(this.props.data.answers[key])
      }
    }

    return (
      <div>
        <h4 className='questionText'>Q: {this.props.data.question_body}</h4>
        {answers.map((answer, index) => {
          return (
          <div className='' key={index}>
          <h4 className='answerText'>A: {answer.body}</h4>
            <table className=''key={index}>
              <tbody>
                <tr>
                  <td className='userIdText'>by {answer.answerer_name}, {answer.date}</td>
                  <td>helpful?</td>
                  <td className='userHelpfulBtn'>Yes</td>
                  <td className='userHelpIndicator'>({answer.helpfulness})</td>
                  <td className='userReportBtn'>report</td>
                </tr>
            </tbody>
          </table>
        </div> )
        })}

      </div>
    )
  }
}


export default QuestionList