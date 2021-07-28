import React from 'react';
import propTypes from 'prop-types';
import YourOutfitCard from './YourOutfitCard.jsx';
import AddToOutfitCard from './AddToOutfitCard.jsx';

const YourOutfitList = (props) => {

  return (
    <div className='yourOutfitListContainer'>
      <h2>Your Outfit: </h2>
    <div className='yourOutfitList'>
    <AddToOutfitCard handleAddToOutfit={props.handleAddToOutfit} allProps={props.allProps} />

    </div>
    </div>
  )
}

YourOutfitList.propTypes = {
  handleAddToOutfit: propTypes.func,
  allProps: propTypes.array
  };

export default YourOutfitList;