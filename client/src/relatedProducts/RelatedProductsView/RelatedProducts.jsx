import React from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from '../YourOutfitView/YourOutfitList.jsx';
import axios from 'axios';
import {currentProduct, relatedProducts, relatedProductsInfo, relatedProductsStyles} from '../exampleData.jsx';

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

    let allProps = [];
    let allPropsObj = {};

    let relatedProductsCopy = Object.assign(this.state.relatedProducts);
    let relatedProductsStylesCopy= Object.assign(this.state.relatedProductsStyles);

    relatedProductsCopy.forEach(item => {
      let itemDetail = {};
      itemDetail['itemId'] = item['id'];
      itemDetail['itemName'] = item['name'];
      itemDetail['itemCategory'] = item['category'];
      allProps.push(itemDetail);

      allPropsObj[item['id']] = itemDetail;
    })


    let moreProps = [];
    relatedProductsStylesCopy.forEach(item => {
      let itemDetail = {};
      itemDetail['itemId'] = item.product_id;

      const firstResult = item.results.filter(result => result['default?'] === true)[0] ?? item.results[0];

      itemDetail['originalPrice'] = firstResult['original_price'];
      itemDetail['salePrice'] = firstResult['sale_price'];
      itemDetail['photoUrl'] =firstResult['photos'][0];

      allPropsObj[item.product_id] = {
        ...allPropsObj[item.product_id],
        'originalPrice': firstResult['original_price'],
        'salePrice': firstResult['sale_price'],
        'photoUrl': firstResult['photos'][0],
      };

      moreProps.push(itemDetail);
    })

    allProps= Object.values(allPropsObj);

    //console.log(`allProps: ${JSON.stringify(allProps)}`)



    return (
      <div className='relatedProducts'>
        <RelatedProductsList allProps={Object.values(allPropsObj)} />
        <YourOutfitList />
      </div>
      )
  }
}