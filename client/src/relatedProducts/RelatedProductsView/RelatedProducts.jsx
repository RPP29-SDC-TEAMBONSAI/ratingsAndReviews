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
    this.handleRemoveFromOutfit = this.handleRemoveFromOutfit.bind(this);
    this.handleCompareItems = this.handleCompareItems.bind(this);
    this.getRelatedStateData = this.getRelatedStateData.bind(this);
    this.getOutfitData = this.getOutfitData.bind(this);
  }

  componentDidMount () {
    let getProduct = new Promise((resolve, reject) => {
      let result=[]
      this.props.state.relatedProducts.forEach((productId) => {
        return productsWithId(productId)
          .then(data => {
            result.push(data.data)
            if (result.length === this.props.state.relatedProducts.length) {
              resolve(result)
            }
          })
      })
    })

    let getStyle = new Promise((resolve, reject) => {
      let result =[]
      this.props.state.relatedProducts.forEach((productId) => {
        return productsStyle(productId)
          .then(data => {
            console.log(data.data)
            result.push(data.data)
            if (result.length === this.props.state.relatedProducts.length) {
              resolve(result)
            }
          })
      })
    })
    let outFitData = new Promise((resolve, reject) => {
      axios.get(api + `products/${this.props.state.product_id}/styles`, {
        headers: {
          'Authorization': TOKEN
        }
      })
      .then((styleData)=> {
        let outfitPropsObj = helper.compileYourOutfitDataToProps(this.props.state.productInformation , styleData.data);

        resolve(outfitPropsObj);
      })
    })

    getProduct.then(data => {
      getStyle.then(styleData => {
        outFitData.then(fitData => {
        let resultStyleWithId=[];

        data.forEach((product, pi) => {
          styleData.forEach((style, si) => {
              if (pi === si) {
              resultStyleWithId.push(helper.addIdToStylesData(style, product.id))
              }

          })
        })

       let allPropsObj = helper.compileRelatedProductsDataToProps(data, resultStyleWithId)


       this.setState({
        relatedProducts: data,
        relatedProductsStyles: resultStyleWithId,
        allPropsObj:allPropsObj,
        rpLoaded: true,
        outfitPropsObj: fitData,
        yoLoaded: true
       })
       let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

        while ( i-- ) {
            values.push( JSON.parse(localStorage.getItem(keys[i])) );
        }
        this.setState({
          yourOutfitItems: values
        })

      })
    })
  })
  }


  componentDidUpdate (prevProps, prevState) {
    if (prevProps.state.product_id !== this.props.state.product_id) {
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
      this.setState({
        yourOutfitItems: [...this.state.yourOutfitItems, outfitItem]
      })
    }

    handleRemoveFromOutfit(outfitItem, e) {
      e.preventDefault();

      let removedItemId = outfitItem.product_id;
      let outfitItemsCopy = Object.assign(this.state.yourOutfitItems);
      let filtered = outfitItemsCopy.filter(product => {
        return product.product_id !== removedItemId
      });
      localStorage.removeItem(removedItemId);
      this.setState({
        yourOutfitItems: filtered
      })
    }

    handleCompareItems(item, e) {
      e.preventDefault();
      console.log(`item to compare: ${JSON.stringify(item)}`);
    }


  render() {
    if (this.props.state.loaded === false || this.state.rpLoaded === false || this.state.yoLoaded === false) {
      return <div className='isLoading'>Loading...</div>
    }

    return (
      <div className='relatedProducts'>
        <RelatedProductsList
        allProps={this.state.allPropsObj}
        handleProductChange={this.props.handleProductChange}
        handleCompareItems={this.handleCompareItems}
        state={this.props.state} />
        <YourOutfitList
        outfitProps={this.state.outfitPropsObj}
        handleAddToOutfit={this.handleAddToOutfit}
        handleRemoveFromOutfit={this.handleRemoveFromOutfit}
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