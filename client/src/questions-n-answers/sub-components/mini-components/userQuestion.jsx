

import React from 'react';
import axios from 'axios'
import {postQuestion, questions} from '../../../clientRoutes/qa.js'

class UserQuestion extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      yourQuestion: 'Does it shrink in Dryer?',
      nickName: 'theOnlyRob',
      email:'robman@gmail.com'
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
    console.log(newObj)

    // postQuestion(newObj)
    //   .then(data => {
    //     questions(this.props.product_id)
    //       .then(d => {

    //         console.log(d, '🔥')
    //         this.props.updateQuestions(d.data)
    //       })
    //   })


    this.setState({
      yourQuestion: 'Your Question',
      nickName: 'What is Your Nickname?',
      email:'Your Email'
    })

  }
  questionFormChange(e) {
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value

    })
  }
  render() {
    return (
      <form className={'qFormData'} onSubmit={this.onQuestionSubmit}>
        <label>
          <h4>Ask Your Question</h4>
          {`About the [${this.props.currentItemName}]`}
        </label>
        <input type='text' value={this.state.yourQuestion} onChange={this.questionFormChange} name='yourQuestion'></input>
        <input type='text' value={this.state.nickName} onChange={this.questionFormChange} name='nickName'></input>
        <input type='text' value={this.state.email} onChange={this.questionFormChange} name='email'></input>
        <button type='submit'>Submit Your Question</button>
      </form>
    )
  }

}


export default UserQuestion