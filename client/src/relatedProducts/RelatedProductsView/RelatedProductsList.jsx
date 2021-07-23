import React from 'react';
import propTypes from 'prop-types';
import RelatedProductsCard from './RelatedProductsCard.jsx';
import CardImage from './CardImage.jsx';

const RelatedProductsList = (props) => {

  return (
    <div className='relatedProductsListContainer'>
      <h2>Related Products:</h2>
    <div className='relatedProductsList'>
    {props.allProps.map(product => {
      return <RelatedProductsCard
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

RelatedProductsList.propTypes = {
  key: propTypes.any,
  name: propTypes.any,
  category: propTypes.any,
  originalPrice: propTypes.any,
  salePrice: propTypes.any,
  photo: propTypes.any,
  allProps: propTypes.any
  };

export default RelatedProductsList;

