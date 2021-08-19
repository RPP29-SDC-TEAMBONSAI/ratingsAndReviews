import React from 'react';
import propTypes from 'prop-types';
import Stars from "../../stars/stars.jsx";



const getStars = function (starsObject) {
  let total = 0;
  let numberOfRatings = 0;
  for (let star in starsObject) {
    numberOfRatings = numberOfRatings + Number(starsObject[star]);
    total = starsObject[star] * star + total;
  }
  let average = total / numberOfRatings;
  let htmlElements = Stars(average);

  if (numberOfRatings !== 0) {
    return htmlElements
  } else {
    return <div className='stars'>{htmlElements.props.children[0]}</div>
  }
};

const YourOutfitCard = (props) => {
  let outfitItemRatings = JSON.parse(localStorage.getItem(props.id)).reviews;

  return (
    <div className='yourOutfitCard'>
        <div className='relatedProductsCardTop'>
          <h2 className='productName' >{props.outfitProps.name}</h2>
          <button className='yourOutfitActionButton' onClick={(e) => {props.handleRemoveFromOutfit(props.outfitProps, e)}}>X</button>
        </div>
        <div className='relatedProductsCardBottom'>
          <h3 className='productCategory'>{props.outfitProps.category}</h3>
          {(function() {
          if (props.outfitProps.salePrice === null) {
            return (
              <h3 className='originalProductPrice'>{props.outfitProps.originalPrice}</h3>
            )
          } else {
            return (
              <div className='salePriceWrapper'>
                <h3 className='originalProductPriceWithSale'>{props.outfitProps.originalPrice}</h3>
                <h3 className='saleProductPrice'>{props.outfitProps.salePrice}</h3>
              </div>
            )
          }
        })()}
          <img id='outfitImage' className='outfitCardImage'
          src={props.outfitProps.photoUrl.thumbnail_url}
          alt='outfit item'
          >
          </img>
          <div className="reviewStars">{getStars(outfitItemRatings)}</div>
        </div>
    </div>
  )

}

YourOutfitCard.propTypes = {
  outfitProps: propTypes.object,
  starRating: propTypes.object,
  handleRemoveFromOutfit: propTypes.func,
  id: propTypes.number,

  };

  export default YourOutfitCard;
