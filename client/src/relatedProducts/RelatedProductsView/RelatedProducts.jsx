import React from 'react';
import propTypes from 'prop-types';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from '../YourOutfitView/YourOutfitList.jsx';
import helper from '../../helper-functions/rpHelpers.js';
import {productsWithId, productsStyle} from "../../clientRoutes/products.js";


export default class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductInfo: '',
      currentProductStyles: '',
      relatedProducts: [],
      relatedProductsStyles: [],
      yourOutfitItems:[],
      allPropsObj: [],
      outfitPropsObj: [],
      loaded: false

    }
    this.handleAddToOutfit = this.handleAddToOutfit.bind(this);
    this.getRelatedStateData = this.getRelatedStateData.bind(this);
  }

  handleAddToOutfit () {
    //console.log('item added to outfit! 🐮', outfitItem);
  }

  componentDidMount () {
    this.getRelatedStateData();
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.state.product_id !== this.props.state.product_id) {
      this.getRelatedStateData();
    }
  }

  getRelatedStateData() {
    this.props.state.relatedProducts.forEach((productId) => {
      Promise.all([
        productsWithId(productId),
        productsStyle(productId)
      ])
      .then((results) => {
        let resultStyleWithId = helper.addIdToStylesData(results[1].data, results[0].data.id)
        this.setState({
          relatedProducts: [...this.state.relatedProducts, results[0].data],
          relatedProductsStyles: [...this.state.relatedProductsStyles, resultStyleWithId]
        })
      })
      .then(() => {
        let productStylesWithId = helper.addIdToStylesData(this.props.state.styles, this.props.state.product_id);
        let allPropsObj = helper.compileRelatedProductsDataToProps(this.state.relatedProducts,this.state.relatedProductsStyles);
        let outfitPropsObj = helper.compileYourOutfitDataToProps(this.props.state.productInformation , productStylesWithId);

        this.setState({
          allPropsObj: allPropsObj,
          outfitPropsObj: outfitPropsObj
        })
      })
      .then(() => {
        this.setState({
          loaded: true,
        })
      })
      .catch((err) => {
        console.log('this is the err 🥲 ', err)
      });
    });
    }

  render() {
    if (this.props.state.loaded === false || this.state.loaded === false) {
      return <div className='isLoading'>Loading...</div>
    }

    return (
      <div className='relatedProducts'>
        <RelatedProductsList allProps={this.state.allPropsObj} handleProductChange={this.props.handleProductChange} />
        <YourOutfitList allProps={this.state.outfitPropsObj} handleAddToOutfit={this.handleAddToOutfit} />
      </div>
    );
  }
}

RelatedProducts.propTypes = {
  handleProductChange: propTypes.func,
  state: propTypes.object
}