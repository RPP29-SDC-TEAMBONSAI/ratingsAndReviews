import React from 'react';
import propTypes from 'prop-types';


const AddToOutfitCard = (props) => {
  //console.log(`stateProps: ${JSON.stringify(props.state)}`)
  return (
    <div className='addToOutfitCard'>
        <button className='addToOutfitButton'
        style={{'fontSize': '50px'}}
        onClick={() => {props.handleAddToOutfit(props.state.product_id)}}
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