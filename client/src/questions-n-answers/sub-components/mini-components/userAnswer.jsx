import React from 'react';
import propTypes from 'prop-types';
import {postAnswer, getUrl} from '../../../clientRoutes/qa'
import AnswerImages from '../mini-components/answerImages.jsx'

class UserAnswer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      yourAnswer: '',
      nickName: '',
      email:'',
      photos: [],
      hideButton: null,
      tempPhoto:null,
      data: '',
      confirmationState: 'hide',
      checked: false,
      fileName: 0
    }
    this.answerFormChange = this.answerFormChange.bind(this)
    this.onAnswerSubmit = this.onAnswerSubmit.bind(this)
    this.userPhotoUpload = this.userPhotoUpload.bind(this)
    this.userFileChange = this.userFileChange.bind(this)
    this.photoConfirm = this.photoConfirm.bind(this)
    this.checkbox = this.checkbox.bind(this)
    this.setValidity = this.setValidity.bind(this)
    this.setInputValidity = this.setInputValidity.bind(this)
    this.resetConfirmationState = this.resetConfirmationFormState.bind(this)
    this.resetPhotoConfirmationState = this.resetPhotoConfirmationState.bind(this)
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.photos[prevState.photos.length -1] !== this.state.photos[this.state.photos.length -1]) {
      let newPhotos = prevState.photos.concat(this.state.photos.slice())

      if (!this.state.photos.length) {

        this.setState({
          photos: []
        })
      } else {

        this.setState({
          fileName:this.state.fileName + 1,

          photos: newPhotos,
          checked: false
        })
      }
    }
  }
  onAnswerSubmit(e) {
    e.preventDefault()
    let currentId = this.props.aFormQuestion_id
    let newObj = {
      body: this.state.yourAnswer.substring(0),
      name: this.state.nickName.substring(0),
      email: this.state.email.substring(0),
      photos: this.state.photos.slice(),
      currentId: currentId

    }

    postAnswer(newObj)
      .then(confirmation=> {
        if (confirmation.status === 201) {
          this.props.updateAnswers();

        }
      })
      this.setState({
        yourAnswer: '',
        nickName: 'Example: jack543!',
        email:'Example: jack@email.com',
        photos: [],
        hideButton: null,
        tempPhoto:null,
        data: '',
        confirmationState: 'hide',
        checked: false
      })
  }
  answerFormChange(e) {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  userPhotoUpload(e) {
    let reader = new FileReader()
    reader.readAsDataURL(this.state.tempPhoto, 'base64')

    reader.onload = () => {
      this.setState({
        fileName: this.state.fileName + 1,
        data: reader.result,
        confirmationState: 'photoConfirmation'
      })
    }
  }
  userFileChange(e) {
    this.setState({
      tempPhoto: e.target.files[0]
    })
  }
  photoConfirm(e) {
    let url = this.state.data.substring(0)
    let photos = this.state.photos.slice()


    if (e.target.className === 'addAnswerPhotoConfirmButton') {
      photos.push(url.toString())
      getUrl(url)
        .then(newUrl => {
          let newPhotos =[]
          newPhotos.push(newUrl)

          this.setState({
            fileName:this.state.fileName + 1,
            photos: newPhotos,
            confirmationState:'photoConfirmationHide',
            checked:false,
          })
        })
    }
  }
  checkbox(e) {
   this.setState({
     checked: !this.state.checked
   })

  }
  setValidity(e) {
    if (e.target.className === 'addAnswerFormText' ) {
      e.target.setCustomValidity('Your answer cannot be empty')
    }
    if (e.target.className === 'addAnswerFormNickNameInput') {
      e.target.setCustomValidity('your nickname cannot be empty')
    }
  }
  setInputValidity(e) {
    e.target.setCustomValidity('')
  }
  resetConfirmationFormState(e) {
    this.setState({
      fileName:'',
      yourAnswer: '',
      nickName: '',
      email:'',
      photos: [],
      hideButton: null,
      tempPhoto:null,
      data: '',
      confirmationState: 'photoConfirmationHide',
      checked: false
    })
  }
  resetPhotoConfirmationState(e) {
    this.setState({
      fileName:'',
      hideButton: null,
      tempPhoto:null,
      data: '',
      confirmationState: 'photoConfirmationHide',
      checked: false
    })
  }

  render() {
    let uploadClass;
    if (this.state.photos.length === 5) {
      uploadClass = 'uploadButtonHide'
    }

    return (
      <div className='aFormData'>
        <div className='answerFormProductImg container'>
          <h1 className='answerFormProductImg text'>{this.props.currentItemName}</h1>
          <img className='answerFormProduct img'src={this.props.currentProductPhoto}/>
        </div>
        <h1 className={this.props.answerFormDisplayClass ? 'closeAnswer': 'hide'} onClick={(e) => {this.props.closeAnswerForm(e), this.resetConfirmationFormState(e)}}>x</h1>
        <form className='addAnswerForm form' onSubmit={this.onAnswerSubmit}>
          <div className='questionText container'>
            <h5 className='selectedQuestionText'>Selected Question:</h5>
            <h4 className='currentQuestion'>{this.props.currentQuestion}</h4>
          </div>

          <h3 className='answerFormAsterisk answer'>Your Answer</h3>
          <textarea className='addAnswerFormText'
                    value ={this.state.yourAnswer}
                    onInput={this.setInputValidity}
                    onClick={(e)=> {this.props.recordClick(e)}}
                    maxLength='1000' type='text'
                    placeholder='your answer here...'
                    onChange={this.answerFormChange}
                    name='yourAnswer'
                    required
                    onInvalid={this.setValidity}
          />
          <h3 className='answerFormAsterisk nickName'>What is your nickname?</h3>
          <input className='addAnswerFormNickNameInput'
                onInput={this.setInputValidity}
                onClick={(e)=> this.props.recordClick(e)}
                type='text'
                maxLength='60'
                placeholder='Example: Jack543!'
                onChange={this.answerFormChange}
                value ={this.state.nickName}
                name='nickName'
                required
                onInvalid={this.setValidity}
          />
          <h3 className='answerFormAsterisk email'>What is your email?</h3>
          <input className='addAnswerFormEmail'
                onInput={this.setInputValidity}
                onClick={(e)=> this.props.recordClick(e)}
                type='email'
                placeholder='Example: jack@email.com'
                onChange={this.answerFormChange}
                value ={this.state.email}
                name='email'
                required
          />


            <h3 className='addAnswerFormUploadPhotoTitle'>Upload Your Photos</h3>

              <div className='fileSelector container'>
              <input onChange={this.userFileChange}
                    onClick={(e)=> this.props.recordClick(e)}
                    key={this.state.fileName}
                    name='file'
                    className='photos'
                    type='file'
                    accept='image/png, image/jpeg'

              />

             <div className='uploadBtn container'>
                <button className={uploadClass? uploadClass: 'uploadButton'}
                        id='uploadBtn'
                        type='button'
                        onClick={(e)=> {this.props.recordClick(e), this.userPhotoUpload(e)}}
                        >Upload
                </button>
              </div>
              </div>

          <div className='submitAnswer container'>
            <input type='submit'
                  className='addAnswersubmit'
                  onClick={(e)=> this.props.recordClick(e)}
                  value='Submit Your Answer'
            />
          </div>
          <div className={this.state.confirmationState}>
            <h2 className='closeConfirmation' onClick={this.resetPhotoConfirmationState}>x</h2>
            <div className='confirmPhoto container'>
              <h4>Confirm Your Photo Selection</h4>
              <input id='checkbox1'
                    type='checkbox'
                    checked={this.state.checked}
                    onClick={(e)=> this.props.recordClick(e)}
                    onChange={this.checkbox}
              />
              <label htmlFor='checkbox1'>
                <img className='answerConfirmPhoto' src={this.state.data}></img>
              </label>
              <div className='addAnswerPhotoConfirmBtn container'>

                <button className='addAnswerPhotoConfirmButton'
                        type='button'
                        onClick={(e)=> {this.props.recordClick(e), this.photoConfirm(e)}}
                        >Confirm
                </button>
              </div>

            </div>
          </div>
          <div className='answerFormPhotoThumbnail'>
            {this.state.photos.map((photo, index) => {
              return <AnswerImages key={index} photo={photo}/>
            })}
          </div>
        </form>
      </div>
    )
  }
}


UserAnswer.propTypes = {
  recordClick:propTypes.func.isRequired,
  currentProductPhoto: propTypes.string.isRequired,
  updateAnswers: propTypes.func.isRequired,
  currentItemName: propTypes.string.isRequired,
  currentQuestion: propTypes.string.isRequired,
  answerFormDisplayClass: propTypes.any,
  closeAnswerForm: propTypes.func.isRequired,
  aFormQuestion_id: propTypes.any
}

export default UserAnswer;

