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
    this.resetForm = this.resetForm.bind(this)
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
    this.setState({
      yourQuestion: '',
      nickName: '',
      email:''
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
  resetForm(e) {
    this.setState({
      yourQuestion: '',
      nickName: '',
      email:''
    })
  }
  render() {
    return (
      <div className='qFormData' >
        <h1 className={this.props.QuestionFormDisplayClass ? 'questionCloseMarker': 'hide'} onClick={(e) => {this.props.closeQuestionForm(), this.resetForm()}}>x</h1>
        <img className='currentQuestionProductPhoto img'src={this.props.currentProductPhoto} />
        <form className='askQuestionForm' onSubmit={(e) => {this.onQuestionSubmit(e), this.resetForm()}}>
          <h1 className='askQuestionForm title'>Ask Your Question</h1>
          <h3 className='addQuestionAsterisk productTitle'> {`About the: ${this.props.currentItemName}`} </h3>
          <textarea className='userQuestion'
                    maxLength='1000'
                    type='text'
                    value={this.state.yourQuestion}
                    onClick={(e) => this.props.recordClick(e)}
                    onInput={this.setInputValidity}
                    onInvalid={this.setValidity}
                    placeholder='Your Question'
                    onChange={this.questionFormChange}
                    name='yourQuestion'
                    required
          />
          <h3 className='addQuestionAsterisk userNickName'>whats your nickname?</h3>
          <input className='userNickName'
                  type='text'
                  value={this.state.nickName}
                  onClick={(e) => this.props.recordClick(e)}
                  onInput={this.setInputValidity}
                  onInvalid={this.setValidity}
                  placeholder='What is Your Nickname?'
                  onChange={this.questionFormChange}
                  name='nickName'required
          />
          <h3 className='addQuestionAsterisk userEmail'>whats your email?</h3>
          <input className='userEmail'
                  type='email'
                  value={this.state.email}
                  onClick={(e) => this.props.recordClick(e)}
                  placeholder='Your Email'
                  onChange={this.questionFormChange}
                  name='email' required
          />
          <div className='userQSubmit'>
            <button className='userQSubmit btn'
                    onClick={(e) => this.props.recordClick(e)}
                    type='submit'
                    >Submit Your Question
            </button>
          </div>
        </form>
      </div>
    )
  }
}

UserQuestion.propTypes = {
  currentProductPhoto:propTypes.string.isRequired,
  recordClick:propTypes.func.isRequired,
  currentItemName: propTypes.string.isRequired,
  addQuestion: propTypes.func.isRequired,
  updateQuestions: propTypes.func.isRequired,
  product_id: propTypes.number.isRequired,
  QuestionFormDisplayClass: propTypes.any,
  closeQuestionForm: propTypes.func.isRequired
}

export default UserQuestion