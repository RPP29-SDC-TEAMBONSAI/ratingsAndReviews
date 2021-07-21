import React from 'react';
import RelatedProductsCard from './RelatedProductsCard.jsx';


const RelatedProductsList = (props) => {
  return (
    <div className='relatedProductsListContainer'>
      <h2>Related Products:</h2>
    <div className='relatedProductsList'>
    {props.relatedProducts.map(product => {
      return <RelatedProductsCard
               key={product.id}
               name={product.name}
               category={product.category}
               defaultPrice={product.default_price}
       />
    })}
    </div>
    </div>
  )
}



export default RelatedProductsList;

