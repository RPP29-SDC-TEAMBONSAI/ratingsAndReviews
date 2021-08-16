import React from 'react';
import propTypes from 'prop-types';


const AddToOutfitCard = (props) => {

  return (
    <div className='addToOutfitCard'>
        <button className='addToOutfitButton'
        style={{'fontSize': '50px'}}
        onClick={(e) => {props.handleAddToOutfit(props.outfitProps, e)}}
        >+</button>
    </div>
  )
}

AddToOutfitCard.propTypes = {
  handleAddToOutfit: propTypes.func,
  outfitProps: propTypes.object,
  state: propTypes.object
  };

  export default AddToOutfitCard;