import React from 'react'
import propTypes from 'prop-types'

const AnswerImages = (props) => {
  return (
      <img className='thumbnail' src={props.photo}></img>
  )
}

AnswerImages.propTypes ={
  photo: propTypes.string.isRequired
}

export default AnswerImages