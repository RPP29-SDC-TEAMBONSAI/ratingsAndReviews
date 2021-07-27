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
      currentProuctId: currentProduct.id,
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
    console.log('item added to outfit! 🐮')
    yourOutfitItems.push(outfitItem);
    console.log(`newOutfitLIst: ${yourOutfitItems}`)
  }


  render() {

    let allPropsObj = helper.compileRelatedProductsDataToProps(this.state.relatedProducts,this.state.relatedProductsStyles);
    let outfitPropsObj = helper.compileYourOutfitDataToProps(this.state.currentProductInfo, this.state.currentProductStyles);

    console.log(`OUTFIT PROPS: ${JSON.stringify(outfitPropsObj)}`);
    console.log(`ALL PROPS: ${JSON.stringify(allPropsObj)}`);

    return (
      <div className='relatedProducts'>
        <RelatedProductsList allProps={allPropsObj} handleProductChange={this.props.handleProductChange} />
        <YourOutfitList handleAddToOutfit={this.handleAddToOutfit} state={this.props.state}/>
      </div>
      )
  }
}

RelatedProducts.propTypes = {
  handleProductChange: propTypes.func,
  state: propTypes.object
}