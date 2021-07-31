import React from 'react';
import propTypes from 'prop-types';


const AddToOutfitCard = (props) => {
  //console.log(`oufitProps: ${JSON.stringify(props.outfitProps)}`)
  return (
    <div className='addToOutfitCard'>
        <button className='addToOutfitButton'
        style={{'fontSize': '50px'}}
        onClick={() => {props.handleAddToOutfit(props.outfitProps)}}
        >+</button>
    </div>
  )
}

AddToOutfitCard.propTypes = {
  handleAddToOutfit: propTypes.func,
  outfitProps: propTypes.array,
  state: propTypes.any
  };

  export default AddToOutfitCard;