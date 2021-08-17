import React from 'react';
import {postQuestion, questions} from '../../../clientRoutes/qa.js'
import propTypes from 'prop-types';

class UserQuestion extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      yourQuestion: '',
      nickName: '',
      email:''
    }
    this.onQuestionSubmit = this.onQuestionSubmit.bind(this)
    this.questionFormChange = this.questionFormChange.bind(this)
    this.setValidity = this.setValidity.bind(this)
    this.setInputValidity = this.setInputValidity.bind(this)
  }

  onQuestionSubmit(e) {
    e.preventDefault()
    let newObj = {
      body: this.state.yourQuestion,
      name: this.state.nickName,
      email: this.state.email,
      product_id: this.props.product_id
    }

    postQuestion(newObj)
      .then(data => {
        this.props.updateQuestions()

      })

    this.props.addQuestion()
  }

  questionFormChange(e) {

    this.setState({
      [e.target.name]: e.target.value
    })
  }
  setValidity(e) {

    if (e.target.className === 'userQuestion' ) {
      e.target.setCustomValidity('Your question cannot be empty')
    }
    if (e.target.className === 'userNickName') {
      e.target.setCustomValidity('your nickname cannot be empty')
    }
  }
  setInputValidity(e) {
    e.target.setCustomValidity('')

  }
  render() {
    return (
      <form  className='qFormData' onSubmit={this.onQuestionSubmit}>
        <div>
          <h1 className={this.props.QuestionFormDisplayClass ? 'questionClose': 'qFormHide'} onClick={(e) => this.props.closeQuestionForm()}>x</h1>
        </div>
        <div  className='askQuestionForm'>
         <h4>Ask Your Question</h4>
         <h3 > {`About the [${this.props.currentItemName}]`} </h3>
        </div>
        <div className='askQuestionForm'>
          <textarea className='userQuestion' maxLength='1000' type='text' onClick={(e) => this.props.recordClick(e)} onInput={this.setInputValidity} onInvalid={this.setValidity} placeholder='Your Question' onChange={this.questionFormChange} name='yourQuestion' required></textarea>
        </div>
        <div className='askQuestionForm'>
          <input className='userNickName' type='text' onClick={(e) => this.props.recordClick(e)} onInput={this.setInputValidity} onInvalid={this.setValidity} placeholder='What is Your Nickname?' onChange={this.questionFormChange} name='nickName'required></input>
        </div >
        <div className='askQuestionForm'>
          <input className='userEmail' type='email' onClick={(e) => this.props.recordClick(e)} placeholder='Your Email' onChange={this.questionFormChange} name='email' required></input>
        </div>
        <div className='askQuestionForm'>
          <button className='userQSubmit'onClick={(e) => this.props.recordClick(e)} type='submit'>Submit Your Question</button>
        </div>
      </form>
    )
  }
}

UserQuestion.propTypes = {
  recordClick:propTypes.func.isRequired,
  currentItemName: propTypes.string.isRequired,
  addQuestion: propTypes.func.isRequired,
  updateQuestions: propTypes.func.isRequired,
  product_id: propTypes.number.isRequired,
  QuestionFormDisplayClass: propTypes.any,
  closeQuestionForm: propTypes.func.isRequired
}

export default UserQuestion