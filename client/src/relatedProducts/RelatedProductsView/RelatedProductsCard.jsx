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

const RelatedProductsCard = (props) => {

  return (
    <div className='relatedProductsCard' onClick={() => props.handleProductChange(props.id)} >
        <h2 className='productName'>{props.name}</h2>
        <h3 className='productCategory'>{props.category}</h3>
        {(function() {
          if (props.salePrice === null) {
            return (
              <h3 className='originalProductPrice'>{props.originalPrice}</h3>
            )
          } else {
            return (
              <div className='salePriceWrapper'>
                <h3 className='originalProductPriceWithSale'>{props.originalPrice}</h3>
                <h3 className='saleProductPrice'>{props.salePrice}</h3>
              </div>
            )
          }
        })()}
        <img src={props.photo || 'https://lightwidget.com/wp-content/uploads/local-file-not-found-480x488.png'}></img>
        <div className="reviewStars">{getStars(props.starRating)}</div>
    </div>
  )

}

RelatedProductsCard.propTypes = {
  photo: propTypes.any,
  salePrice: propTypes.any,
  originalPrice: propTypes.any,
  category: propTypes.any,
  name: propTypes.any,
  handleProductChange: propTypes.any,
  id: propTypes.any,
  starRating: propTypes.object
  };

  export default RelatedProductsCard;