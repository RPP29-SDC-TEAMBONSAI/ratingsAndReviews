import React from 'React';
import QnAClientHelpers from '../../../helpers/qnAHelper';


class QuestionList extends React.Component {
  constructor(props) {
    super(props)



    this.state = {
      answers: [],
      questions: '',
      answerHide: 'answerListTable Hide',




    }
    this.hide = this.hide.bind(this)
    this.showOrHide = this.showOrHide.bind(this)
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
        questions: questions,


      })

    } else {

      this.setState({
        questions: questions,


      })

    }

  }

  hide(currentClassname, index) {

    let newClass;

    if (index <= 1) {
      newClass = 'answerListTable'
    }
    if (currentClassname === 'Hide') {
      newClass = this.state.answerHide
    }

    if (index >= 2) {
      newClass = this.state.answerHide
    }
    return newClass

  }

  showOrHide(currentCount, i) {
    console.log(i)
    let _class;

    if (currentCount % 2 !== 0)  {
      if (i >= 2) {
        _class = 'answerListTable'

      }

    } else {
      if (i >= 2) {
        _class = 'answerListTable Hide'

      }
    }
    return _class


  }



  render() {


    return (
      <div className='list container'>
        <h4 className={this.props.classname}>Q: {this.state.questions}</h4>
        {this.state.answers.map((answer, index) => {



          let _class= this.hide(this.props.classname, index)
          console.log(this.props)

          let showOrHideClass = this.showOrHide(this.props.answerCount, index)
          let showClass;
          if (showOrHideClass === 'answerListTable') {
            showClass = showOrHideClass

          }
          console.log(showClass)

          return (
            <div className={showClass ? showClass : _class} key={index}>
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
          </div>
          )
        })}
      </div>
    )
  }
}


export default QuestionList