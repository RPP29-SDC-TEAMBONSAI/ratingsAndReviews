import React from 'react';
import propTypes from 'prop-types';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from '../YourOutfitView/YourOutfitList.jsx';
import helper from '../../helper-functions/rpHelpers.js';
import {productsWithId, productsStyle, outfitStyle} from "../../clientRoutes/products.js";
import axios from 'axios';

const TOKEN = require("../../../../config.js").GITHUB_TOKEN;
const api = require("../../../../config.js").API;



export default class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: [],
      relatedProductsStyles: [],
      yourOutfitItems:[],
      allPropsObj: [],
      outfitPropsObj: [],
      rpLoaded: false,
      yoLoaded: false

    }
    this.handleAddToOutfit = this.handleAddToOutfit.bind(this);
    this.getRelatedStateData = this.getRelatedStateData.bind(this);
    this.getOutfitData = this.getOutfitData.bind(this);
  }

  componentDidMount () {
    this.getRelatedStateData();
    this.getOutfitData();
    let values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

      while ( i-- ) {
          values.push( JSON.parse(localStorage.getItem(keys[i])) );
      }
      this.setState({
        yourOutfitItems: values
      })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.state.product_id !== this.props.state.product_id) {
      this.getRelatedStateData();
      this.getOutfitData();
    }
  }

  getRelatedStateData() {
    this.setState({
      rpLoaded: false
    });
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
        let allPropsObj = helper.compileRelatedProductsDataToProps(this.state.relatedProducts,this.state.relatedProductsStyles, this.props.state.ratings);

        this.setState({
          allPropsObj: allPropsObj,
        })
      })
      .then(() => {
        this.setState({
          rpLoaded: true,
        })
      })
      .catch((err) => {
        console.log('this is the err 🥲 ', err)
      });
    });
    }

    getOutfitData () {
    this.setState({
      yoLoaded: false
    });

    axios.get(api + `products/${this.props.state.product_id}/styles`, {
      headers: {
        'Authorization': TOKEN
      }
    })
    .then((styleData)=> {
      let outfitPropsObj = helper.compileYourOutfitDataToProps(this.props.state.productInformation , styleData.data);
      return outfitPropsObj;
    })
    .then(outfitPropsObj => {
      this.setState({
        outfitPropsObj: outfitPropsObj,
        yoLoaded: true
      })
    })
    .catch((err) => {
      console.log('err errrr', err)
      res.status(500).end()
    })

    }

    handleAddToOutfit (outfitItem, e) {
      e.preventDefault();
      localStorage.setItem(outfitItem.product_id, JSON.stringify(outfitItem));

    }


  render() {
    if (this.props.state.loaded === false || this.state.rpLoaded === false || this.state.yoLoaded === false) {
      return <div className='isLoading'>Loading...</div>
    }
    console.log(`allProps: ${JSON.stringify(this.state.allPropsObj)}`)
    return (
      <div className='relatedProducts'>
        <RelatedProductsList
        allProps={this.state.allPropsObj}
        handleProductChange={this.props.handleProductChange}
        state={this.props.state} />
        <YourOutfitList
        outfitProps={this.state.outfitPropsObj}
        handleAddToOutfit={this.handleAddToOutfit}
        outfitItems={this.state.yourOutfitItems}
        state={this.props.state} />
      </div>
    );
  }
}

RelatedProducts.propTypes = {
  handleProductChange: propTypes.func,
  state: propTypes.object
}