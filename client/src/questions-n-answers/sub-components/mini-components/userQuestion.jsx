import React from 'react';
import axios from 'axios'
import {postQuestion, questions} from '../../../clientRoutes/qa.js'
import propTypes from 'prop-types';

class UserQuestion extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      yourQuestion: 'Your Question',
      nickName: 'What is Your Nickname?',
      email:'Your Email'
    }
    this.onQuestionSubmit = this.onQuestionSubmit.bind(this)
    this.questionFormChange = this.questionFormChange.bind(this)
  }

  onQuestionSubmit(e) {
    e.preventDefault()
    console.log(e)
    let newObj = {
      body: this.state.yourQuestion,
      name: this.state.nickName,
      email: this.state.email,
      product_id: this.props.product_id
    }

    postQuestion(newObj)
      .then(data => {
        questions(this.props.product_id)
          .then(d => {
            this.props.updateQuestions(d.data)
          })
      })

    this.setState({
      yourQuestion: 'Your Question',
      nickName: 'What is Your Nickname?',
      email:'Your Email'
    })
    this.props.addQuestion()

  }
  questionFormChange(e) {
    console.log(e.target.value)

    this.setState({
      [e.target.name]: e.target.value

    })
    this.onAnswerSubmit = this.onAnswerSubmit.bind(this)
  }

  onAnswerSubmit(e) {
    e.preventDefault()

  }

  render() {
    return (

      <form  className={'qFormData'} onSubmit={this.onAnswerSubmit}>
        <div  className='askQuestionForm'>
         <h4>Ask Your Question</h4>
         <h3 > {`About the [${this.props.currentItemName}]`} </h3>
        </div>
        <div className='askQuestionForm'>
          <textarea className='userQuestion' maxLength='1000' type='text' value={this.state.yourQuestion} onChange={this.questionFormChange} name='yourQuestion'></textarea>
        </div>
        <div className='askQuestionForm'>
          <input className='userNickName' type='text' value={this.state.nickName} onChange={this.questionFormChange} name='nickName'></input>
        </div >
        <div className='askQuestionForm'>
          <input className='userEmail' type='text' value={this.state.email} onChange={this.questionFormChange} name='email'></input>
        </div>
        <div className='askQuestionForm'>
          <button className='userQSubmit' type='submit'>Submit Your Question</button>
        </div>
      </form>

    )
  }
}

UserQuestion.propTypes = {

  currentItemName: propTypes.string.isRequired,
  addQuestion: propTypes.func.isRequired,
  updateQuestions: propTypes.func.isRequired,
  product_id: propTypes.number.isRequired
}

export default UserQuestion