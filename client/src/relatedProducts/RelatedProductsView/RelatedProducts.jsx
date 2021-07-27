import React from 'react';
import propTypes from 'prop-types';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from '../YourOutfitView/YourOutfitList.jsx';
import {currentProduct, currentProductStyles, relatedProducts, relatedProductsInfo, relatedProductsStyles} from '../exampleData.jsx';
import helper from '../../helper-functions/rpHelpers.js';



export default class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductInfo: currentProduct,
      currentProductStyles: currentProductStyles,
      relatedProductIds: relatedProducts,
      relatedProducts: relatedProductsInfo,
      relatedProductsStyles: relatedProductsStyles,
      yourOutfitItems:[],
    }
    this.handleAddToOutfit = this.handleAddToOutfit.bind(this);
  }

  handleAddToOutfit (outfitItem) {
    //console.log('item added to outfit! 🐮', outfitItem);
  }


  render() {

   let stateStylesCopy = Object.assign(this.props.state.styles);
   let productStylesWithId = {};
   productStylesWithId['product_id'] = this.props.state.product_id;
   productStylesWithId['results'] = stateStylesCopy;

    let allPropsObj = helper.compileRelatedProductsDataToProps(this.state.relatedProducts,this.state.relatedProductsStyles);
    let outfitPropsObj;

    if (productStylesWithId['results'].length > 2) {
      outfitPropsObj = helper.compileYourOutfitDataToProps((this.props.state.productInformation || this.state.currentProductInfo), productStylesWithId);
    } else {
      outfitPropsObj = helper.compileYourOutfitDataToProps((this.props.state.productInformation || this.state.currentProductInfo), (this.state.currentProductStyles));

    }



    return (
      <div className='relatedProducts'>
        <RelatedProductsList allProps={allPropsObj} handleProductChange={this.props.handleProductChange} />
        <YourOutfitList allProps={outfitPropsObj} handleAddToOutfit={this.handleAddToOutfit} />
      </div>
      )
  }
}

RelatedProducts.propTypes = {
  handleProductChange: propTypes.func,
  state: propTypes.object
}