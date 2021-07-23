import React from 'react';
import propTypes from 'prop-types';

const CardImage = (props) => {
  return (
    <div className='cardImage'>
      <h2>Image for card</h2>
      <h3>{props.defaultPrice}</h3>
      <img src={props.photo} width="200" height="200"></img>
    </div>
  )
}

CardImage.propTypes = {
  defaultPrice: propTypes.any,
  photo: propTypes.any
  };

export default CardImage;