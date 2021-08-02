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

  return htmlElements;
};

const YourOutfitCard = (props) => {
  console.log(`card props: ${JSON.stringify(props)}`)
  return (
    <div className='yourOutfitCard'>
        <h2 className='productName'>{props.outfitProps.name}</h2>
        <h3 className='productCategory'>{props.outfitProps.category}</h3>
        <h3 className='originalProductPrice'>{props.outfitProps.originalPrice}</h3>
        <h3 className='saleroductPrice'>{props.outfitProps.salePrice}</h3>
        <img src={props.outfitProps.photoUrl.thumbnail_url}></img>
        <div className="reviewStars">{getStars(props.starRating)}</div>
    </div>
  )

}

YourOutfitCard.propTypes = {
  outfitProps: propTypes.any,
  starRating: propTypes.object
  };

  export default YourOutfitCard;
