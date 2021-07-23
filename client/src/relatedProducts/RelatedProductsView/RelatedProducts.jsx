import React from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from '../YourOutfitView/YourOutfitList.jsx';
import axios from 'axios';
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
  componentDidMount() {

  }

  render() {
    let allPropsObj = helper.compileDataToProps(this.state.relatedProducts,this.state.relatedProductsStyles);
    return (
      <div className='relatedProducts'>
        <RelatedProductsList allProps={allPropsObj} />
        <YourOutfitList allProps={allPropsObj} />
      </div>
      )
  }
}

