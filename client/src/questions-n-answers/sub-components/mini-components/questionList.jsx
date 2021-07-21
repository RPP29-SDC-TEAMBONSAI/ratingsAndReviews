import React from 'React';
import QnAClientHelpers from '../../../helper-functions/qnAHelper';


class QuestionList extends React.Component {
  constructor(props) {
    super(props)



    this.state = {
      answers: [],
      questions: '',
      hide: 'answerListTable Hide'


    }
  }

  componentDidMount() {
    let helper = new QnAClientHelpers()
    let answers=[]
    let copy = {}
    copy = Object.assign(copy, this.props.data.answers)
    //is this best way for getting answers??? probably not

    //* the question results came in as an array of objects - but the answers came in as a nested object
    //so in order to associate the create answers with the correct questions, without having to make
    //another request to db, i pulled all the answers with the below functionality and pushed them to an array.
    let sortedAnswers;

    let questions = this.props.data.question_body
    if (Object.keys(copy).length) {
      for (var key in copy) {
        answers.push(copy[key])
      }
      sortedAnswers = helper.sortAnswers(answers)
      this.setState({
        answers: sortedAnswers,
        questions: questions

      })

    } else {

      this.setState({
        questions: questions
      })

    }

  }



  render() {


    return (
      <div className='list container'>
        <h4 className='questionText'>Q: {this.state.questions}</h4>
        {this.state.answers.map((answer, index) => {
          let _class;
          if (index <= 1) {
            _class = 'answerListTable'

          } else {
            _class = this.state.hide
          }
          return (
          <div className={_class} key={index}>
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