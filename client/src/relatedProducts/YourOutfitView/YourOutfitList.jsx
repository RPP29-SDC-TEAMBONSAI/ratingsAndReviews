import React from 'react';
import propTypes from 'prop-types';
import YourOutfitCard from './YourOutfitCard.jsx';
import AddToOutfitCard from './AddToOutfitCard.jsx';
//import withClickTracker from '../withClickTracker.jsx';

const YourOutfitList = (props) => {
  //const { count, recordCount } = props;
  return (
    <div className='yourOutfitListContainer' >
      <h2 className='yourOutfitTitle' >Your Outfit: </h2>
      <div className='yourOutfitList' >
      <AddToOutfitCard handleAddToOutfit={props.handleAddToOutfit} outfitProps={props.outfitProps} state={props.state} />
      {props.outfitItems.map((outfitItem, i) => {
        return (<div className='outfitItem' key={i}>
                 <YourOutfitCard
                  key={outfitItem.id}
                  id={outfitItem.product_id}
                  outfitProps={outfitItem}
                  starRating={props.state.ratings}
                  handleRemoveFromOutfit={props.handleRemoveFromOutfit}
                  />
               </div>)
      })}
    </div>
    </div>
  )
}

YourOutfitList.propTypes = {
  handleAddToOutfit: propTypes.func,
  handleRemoveFromOutfit: propTypes.func,
  outfitProps: propTypes.object,
  state: propTypes.object,
  outfitItems: propTypes.array,
  count: propTypes.number,
  recordCount: propTypes.func
  };

export default YourOutfitList;