import React from 'react';
import propTypes from 'prop-types';


const AddToOutfitCard = (props) => {
  let itemToAdd = props.allProps[0].itemId;
  return (
    <div className='addToOutfitCard'>
        <button className='addToOutfitButton'
        style={{'font-size': '50px'}}
        onClick={props.handleAddToOutfit(itemToAdd)}
        >+</button>

    </div>
  )

}

AddToOutfitCard.propTypes = {
  handleAddToOutfit: propTypes.func,
  allProps: propTypes.array
  };

  export default AddToOutfitCard;