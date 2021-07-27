import React from 'react';
import propTypes from 'prop-types';


const AddToOutfitCard = (props) => {

  return (
    <div className='addToOutfitCard'>
        <button className='addToOutfitButton'
        style={{'font-size': '50px'}}
        onClick={props.handleAddToOutfit}
        >+</button>

    </div>
  )

}

AddToOutfitCard.propTypes = {
  handleAddToOutfit: propTypes.func
  };

  export default AddToOutfitCard;