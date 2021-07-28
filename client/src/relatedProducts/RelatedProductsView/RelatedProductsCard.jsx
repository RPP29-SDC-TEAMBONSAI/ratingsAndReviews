import React from 'react';
import propTypes from 'prop-types';


const RelatedProductsCard = (props) => {

  return (
    <div className='relatedProductsCard' onClick={() => props.handleProductChange(props.id)} >
        <h2 className='productName'>{props.name}</h2>
        <h3 className='productCategory'>{props.category}</h3>
        <h3 className='originalProductPrice'>{props.originalPrice}</h3>
        <h3 className='saleroductPrice'>{props.salePrice}</h3>
        <img src={props.photo || 'https://lightwidget.com/wp-content/uploads/local-file-not-found-480x488.png'}></img>

        <span className="material-icons actionStar">star</span><span className="material-icons actionStar">star</span><span className="material-icons actionStar">star</span><span className="material-icons actionStar">star</span><span className="material-icons actionStar">star</span>
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
  id: propTypes.any
  };

  export default RelatedProductsCard;