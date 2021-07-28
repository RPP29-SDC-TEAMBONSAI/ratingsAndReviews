import React from 'react';
import propTypes from 'prop-types';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from '../YourOutfitView/YourOutfitList.jsx';
import {currentProduct, relatedProducts, relatedProductsInfo, relatedProductsStyles} from '../exampleData.jsx';
import helper from '../../helper-functions/rpHelpers.js';



export default class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProuctId: currentProduct.id,
      relatedProductIds: relatedProducts,
      relatedProducts: relatedProductsInfo,
      relatedProductsStyles: relatedProductsStyles
    }
  }


  render() {
    let allPropsObj = helper.compileDataToProps(this.state.relatedProducts,this.state.relatedProductsStyles);

    return (
      <div className='relatedProducts'>
        <RelatedProductsList allProps={allPropsObj} handleProductChange={this.props.handleProductChange} />
        <YourOutfitList allProps={allPropsObj} />
      </div>
    );
  }
}

RelatedProducts.propTypes = {
  handleProductChange: propTypes.any
}