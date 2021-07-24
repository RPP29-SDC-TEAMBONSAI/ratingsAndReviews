import React from 'react';

// name, description, catagory, # of reviews, average review, price & sale price

const ProductInfo = (props) => {

  if (props.state.styles.length > 0) {


    return (
      <div>
      <div className = "productInfo">
      <div className = "reviewStars">⭒⭒⭒⭒⭒</div>
      <a href="#link_to_reviews">Read all # Reviews</a>
      </div>
      <h2 className = "expandedProductName">{props.state.productInformation.name}</h2>
      <h3 className = "expandedProductStyleName">{props.state.styles[props.OverviewState.styleIndex].name}</h3>
      <p className = "productDescription">{props.state.productInformation.description}</p>
      {function () {
        if (props.state.styles[props.OverviewState.styleIndex].sale_price === null) {
        return (
          <p className = "productPrice">  ${props.state.styles[props.OverviewState.styleIndex].original_price} </p>
        )} else {
          return (
            <>
           <div className = "productOriginalPrice"> Original Price: ${props.state.styles[props.OverviewState.styleIndex].original_price}</div>
           <div className = "productSalePrice">Sale Price: ${props.state.styles[props.OverviewState.styleIndex].sale_price} </div>
           </>
          )
        }
      }()}
    </div>
  )
} else {
  return null;
}
};

export default ProductInfo;