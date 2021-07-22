import React from 'react';

// name, description, catagory, # of reviews, average review, price & sale price

const ProductInfo = (props) => {

  if (props.state.styles.length > 0) {


    return (
      <div>
      <div className = "productInfo">
        <div className = "reviewStars">⭒⭒⭒⭒⭒</div>
        <p>Read all # reviews</p>
      </div>
      <h2 className = "expandedProductName">{props.state.productInformation.name}</h2>
      <h3 className = "expandedProductStyleName">{props.state.styles[2].name}</h3>
      <p className = "productDescription">{props.state.productInformation.description}</p>
      <p className = "productPrice"> Default price ${props.state.styles[2].original_price} sale price ${props.state.styles[2].sale_price} </p>
    </div>
  )
} else {
  return null;
}
};

export default ProductInfo;