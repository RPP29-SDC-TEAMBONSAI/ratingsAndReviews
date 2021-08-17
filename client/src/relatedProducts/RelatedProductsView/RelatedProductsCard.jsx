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

const RelatedProductsCard = (props) => {

  return (
    <div className='relatedProductsCard' onClick={() => props.handleProductChange(props.id)} >
        <div className='relatedProductsCardTop'>
          <h2 className='productName'>{props.name}</h2>
          <button className='relatedProductsActionButton'onClick={(e) => {props.handleCompareItems(props, e)}}>★</button>
        </div>
        <div className='relatedProductsCardBottom'>
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
        <img id='rpImage' src={props.photo || 'https://lightwidget.com/wp-content/uploads/local-file-not-found-480x488.png'}
        alt='clothing product'
        className='relatedProductImage'></img>

        <span className="reviewStars">{getStars(props.starRating.ratings)}</span>
        </div>
    </div>
  )

}

RelatedProductsCard.propTypes = {
  photo: propTypes.string,
  salePrice: propTypes.any,
  originalPrice: propTypes.any,
  category: propTypes.string,
  name: propTypes.string,
  handleProductChange: propTypes.func,
  handleCompareItems: propTypes.func,
  id: propTypes.number,
  starRating: propTypes.any,

  };

  export default RelatedProductsCard;