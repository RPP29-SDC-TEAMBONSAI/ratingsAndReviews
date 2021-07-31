import React from 'react';
import propTypes from 'prop-types';


const YourOutfitCard = (props) => {
  console.log(`card props: ${JSON.stringify(props)}`)
  return (
    <div className='yourOutfitCard'>
        <h2 className='productName'>{props.outfitProps.itemName}</h2>
        <h3 className='productCategory'>{props.outfitProps.itemCategory}</h3>
        <h3 className='originalProductPrice'>{props.outfitProps.originalPrice}</h3>
        <h3 className='saleroductPrice'>{props.outfitProps.salePrice}</h3>
        <img src={props.outfitProps.photoUrl.thumbnail_url}></img>
        <span className="material-icons actionStar">star</span><span className="material-icons actionStar">star</span><span className="material-icons actionStar">star</span><span className="material-icons actionStar">star</span><span className="material-icons actionStar">star</span>
    </div>
  )

}

YourOutfitCard.propTypes = {
  outfitProps: propTypes.any
  };

  export default YourOutfitCard;
