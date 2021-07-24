import React from 'react';
import propTypes from 'prop-types';
import YourOutfitCard from './YourOutfitCard.jsx';

const YourOutfitList = (props) => {
  return (
    <div className='yourOutfitListContainer'>
      <h2>Your Outfit: </h2>
    <div className='yourOutfitList'>
    {props.allProps.map(product => {
      return <YourOutfitCard
               key={product.itemId}
               name={product.itemName}
               category={product.itemCategory}
               originalPrice={product.originalPrice}
               salePrice={product.salePrice}
               photo={product.photoUrl.thumbnail_url}


       />
    })}

    </div>
    </div>
  )
}

YourOutfitList.propTypes = {
  allProps: propTypes.any
  };

export default YourOutfitList;