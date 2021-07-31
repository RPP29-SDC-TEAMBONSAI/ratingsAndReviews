import React from 'react';
import propTypes from 'prop-types';
import YourOutfitCard from './YourOutfitCard.jsx';
import AddToOutfitCard from './AddToOutfitCard.jsx';

const YourOutfitList = (props) => {
  console.log(`outfitProps ${JSON.stringify(props.outfitProps)}`)
  return (
    <div className='yourOutfitListContainer'>
      <h2>Your Outfit: </h2>
    <div className='yourOutfitList'>
    <AddToOutfitCard handleAddToOutfit={props.handleAddToOutfit} outfitProps={props.outfitProps} state={props.state} />
    {props.outfitItems.map((outfitItem, i) => {
      //console.log(`🐥 outfitItembeing cardified: ${JSON.stringify(outfitItem)}`)
      return (<div className='outfitItem' key={i}>
               <YourOutfitCard
                key={outfitItem.id}
                outfitProps={outfitItem}
                />
             </div>)
    })}
    </div>
    </div>
  )
}

YourOutfitList.propTypes = {
  handleAddToOutfit: propTypes.func,
  outfitProps: propTypes.object,
  state: propTypes.object,
  outfitItems: propTypes.array
  };

export default YourOutfitList;