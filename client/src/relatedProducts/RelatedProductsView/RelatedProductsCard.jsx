import React from 'react';
import propTypes from 'prop-types';
import CardImage from './CardImage.jsx';

const RelatedProductsCard = (props) => {

  return (
    <div className='relatedProductsCard'>
        <h2 className='productName'>{props.name}</h2>
        <h3 className='productCategory'>{props.category}</h3>
        <h3 className='originalProductPrice'>{props.originalPrice}</h3>
        <h3 className='saleroductPrice'>{props.salePrice}</h3>
        <img src={props.photo}></img>

        <span className="material-icons actionStar">star</span><span className="material-icons actionStar">star</span><span className="material-icons actionStar">star</span><span className="material-icons actionStar">star</span><span className="material-icons actionStar">star</span>
    </div>
  )

}

RelatedProductsCard.propTypes = {
  name: propTypes.any,
  id: propTypes.any,
  category: propTypes.any,
  originalPrice: propTypes.any,
  salePrice: propTypes.any,
  photo: propTypes.any
  };

  export default RelatedProductsCard;