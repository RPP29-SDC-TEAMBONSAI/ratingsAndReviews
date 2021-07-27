import React from 'react';
import propTypes from 'prop-types';



class UserAnswer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      yourAnswer: 'Your Answer',
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


  onAnswerSubmit(e) {
    e.preventDefault()
  }

  answerFormChange(e) {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  userPhotoUpload(e) {
    let reader = new FileReader()


   reader.readAsDataURL(this.state.tempPhoto, 'base64')
    // let url = 'process'
   reader.onload = () => {

      this.setState({
        data: reader.result,
        confirmationState: 'photoConfirmation'
      })
    }







  //  console.log(Buffer.from(this.state.tempPhoto[0]))

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


    let checkbox = document.getElementById('checkbox1')

    photos.push(url.toString())
    console.log(this.state.photos.length === 4)
    if (this.state.photos.length === 4) {
      uploadClass = 'uploadButtonHide'
    }

    this.setState({
      data:'',
      confirmationState:'photoConfirmationHide',
      photos: photos,
      hideButton: uploadClass ? uploadClass: null,
      checked: false

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
          {/* <h4>Ask Your Question</h4> */}
          <h3 > {`${this.props.currentItemName}: ${this.props.currentQuestion}`}</h3>
        </div>

        <div className=''>
          <h3>Your Answer</h3>
          <textarea className='' maxLength='1000' type='text' value='' onChange={this.answerFormChange} name='yourAnswer'></textarea>
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
          <button className={this.state.hideButton} onClick={this.userPhotoUpload}>Upload</button>
        </div>

        <div className=''>
          <button className='' type='submit' >Submit Your Answer</button>
        </div>

       <div className={this.state.confirmationState}>
         <h4>Confirm Your Photo Selection</h4>
         <input id='checkbox1' type='checkbox'  checked={this.state.checked} onChange={this.checkbox}/>
         <label htmlFor='checkbox1'><img src={this.state.data}></img></label>
         <div>
           <button onClick={this.photoConfirm}>Confirm</button>
         </div>
       </div>

       <div>
         <img className='thumbnail' src={this.state.photos[0]}></img>
         <img className='thumbnail' src={this.state.photos[1]}></img>
         <img className='thumbnail' src={this.state.photos[2]}></img>
         <img className='thumbnail' src={this.state.photos[3]}></img>
         <img className='thumbnail' src={this.state.photos[4]}></img>
       </div>





      </form>

    )
  }
}

export default UserAnswer;

