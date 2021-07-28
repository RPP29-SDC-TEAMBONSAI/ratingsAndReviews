import React from 'react';
import propTypes from 'prop-types';
import YourOutfitCard from './YourOutfitCard.jsx';
import AddToOutfitCard from './AddToOutfitCard.jsx';

const YourOutfitList = (props) => {

  return (
    <div className='yourOutfitListContainer'>
      <h2>Your Outfit: </h2>
    <div className='yourOutfitList'>
    <AddToOutfitCard handleAddToOutfit={props.handleAddToOutfit} outfitProps={props.outfitProps} state={props.state} />

    </div>
    </div>
  )
}

YourOutfitList.propTypes = {
  handleAddToOutfit: propTypes.func,
  outfitProps: propTypes.array,
  state: propTypes.any
  };

export default YourOutfitList;