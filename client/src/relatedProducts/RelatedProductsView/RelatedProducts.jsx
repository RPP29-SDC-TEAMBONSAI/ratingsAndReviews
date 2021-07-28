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
      allPropsObj: [],
      outfitPropsObj: [],

    }
    this.handleAddToOutfit = this.handleAddToOutfit.bind(this);
  }

  handleAddToOutfit () {
    //console.log('item added to outfit! 🐮', outfitItem);
  }

  componentDidMount () {
    let productStylesWithId = helper.addIdToStylesData(this.props.state.styles, this.props.state.product_id);
    let allPropsObj = helper.compileRelatedProductsDataToProps(this.state.relatedProducts,this.state.relatedProductsStyles);
    let outfitPropsObj = helper.compileYourOutfitDataToProps(this.props.state.productInformation , productStylesWithId);

    this.setState({
      allPropsObj: allPropsObj,
      outfitPropsObj: outfitPropsObj
    })
  }

  render() {
    console.log
    //console.log(`allprops: ${JSON.stringify(this.state.allPropsObj)}`)
    //console.log(`outfitprops: ${JSON.stringify(this.state.outfitPropsObj)}`)

    if (!this.props.state.loaded) {
      return <div className='isLoading'>Loading...</div>
    }

    return (
      <div className='relatedProducts'>
        <RelatedProductsList allProps={this.state.allPropsObj} handleProductChange={this.props.handleProductChange} />
        <YourOutfitList allProps={this.state.outfitPropsObj} handleAddToOutfit={this.handleAddToOutfit} />
      </div>
      )
  }
}

RelatedProducts.propTypes = {
  handleProductChange: propTypes.func,
  state: propTypes.object
}