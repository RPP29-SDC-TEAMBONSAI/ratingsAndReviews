import React from 'react';
import propTypes from 'prop-types';
import {postAnswer, getUrl} from '../../../clientRoutes/qa'
import AnswerImages from '../mini-components/answerImages.jsx'

class UserAnswer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      yourAnswer: '',
      nickName: 'Example: jack543!',
      email:'Example: jack@email.com',
      photos: [],
      hideButton: null,
      tempPhoto:null,
      data: '',
      confirmationState: 'photoConfirmationHide',
      checked: false
    }

    this.answerFormChange = this.answerFormChange.bind(this)
    this.onAnswerSubmit = this.onAnswerSubmit.bind(this)
    this.userPhotoUpload = this.userPhotoUpload.bind(this)
    this.userFileChange = this.userFileChange.bind(this)
    this.photoConfirm = this.photoConfirm.bind(this)
    this.checkbox = this.checkbox.bind(this)
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
        photos: newPhotos,
        checked: false
      })
    }

    }


  }


  onAnswerSubmit(e) {
    e.preventDefault()
    let currentId = this.props.question_id
    let newObj = {
      body: this.state.yourAnswer.substring(0),
      name: this.state.nickName.substring(0),
      email: this.state.email.substring(0),
      photos: this.state.photos.slice(),
      currentId: currentId

    }

    postAnswer(newObj)
      .then(confirmation=> {
        // console.log(confirmation, "✅")
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
        confirmationState: 'photoConfirmationHide',
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
    let newForm = new FormData()
    newForm.append('image', this.state.tempPhoto)

    reader.readAsDataURL(this.state.tempPhoto, 'base64')

    reader.onload = () => {

      this.setState({
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
    let uploadClass;
    // console.log(this.state.tempPhoto.size)


    photos.push(url.toString())

    if (this.state.photos.length === 4) {
      uploadClass = 'uploadButtonHide'
    }

    getUrl(url)
      .then(newUrl => {
        // console.log
        let newPhotos =[]
        newPhotos.push(newUrl)

        this.setState({
          photos: newPhotos,
          confirmationState:'photoConfirmationHide',
        })
      })

  }

  checkbox(e) {
   this.setState({
     checked: true
   })

  }

  render() {
    return (
      <form  className={'aFormData'} onSubmit={this.onAnswerSubmit}>

        <div  className=''>
          <h3 > {`${this.props.currentItemName}: ${this.props.currentQuestion}`}</h3>
        </div>

        <div className=''>
          <h3>Your Answer</h3>
          <textarea className='' maxLength='1000' type='text' value={this.state.yourAnswer} onChange={this.answerFormChange} name='yourAnswer'></textarea>
        </div>

        <div className=''>
          <h3>What is your nickname</h3>
          <input className='' type='text' maxLength='60' value={this.state.nickName} onChange={this.answerFormChange} name='nickName'></input>
        </div >

        <div className=''>
          <h3>What is your email?</h3>
          <input className='' type='text' value={this.state.email} onChange={this.answerFormChange} name='email'></input>
        </div>

        <div>
          <h3>Upload Your Photos</h3>
          <input onChange={this.userFileChange} name='file' className='photos' type='file' accept='image/png, image/jpeg'></input>
          <button className={this.state.hideButton} type='button' onClick={this.userPhotoUpload}>Upload</button>
        </div>

        <div className=''>
          <input type='submit' value='Submit Your Answer' ></input>
        </div>

       <div className={this.state.confirmationState}>
         <h4>Confirm Your Photo Selection</h4>
         <input id='checkbox1' type='checkbox'  checked={this.state.checked} onChange={this.checkbox}/>
         <label htmlFor='checkbox1'><img src={this.state.data}></img></label>
         <div>
           <button type='button' onClick={this.photoConfirm}>Confirm</button>
         </div>
       </div>

       <div>
         {this.state.photos.map((photo, index) => {
           return <AnswerImages key={index} photo={photo}/>
         })}
       </div>

      </form>

    )
  }
}

UserAnswer.propTypes = {
  question_id: propTypes.number.isRequired,
  updateAnswers: propTypes.func.isRequired,
  currentItemName: propTypes.string.isRequired,
  currentQuestion: propTypes.string.isRequired,
}

export default UserAnswer;

