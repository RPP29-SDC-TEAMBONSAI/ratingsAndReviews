import React from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';
import axios from 'axios';
import products from './exampleData.jsx';

export default class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: products
    }
  }
  componentDidMount() {
    // axios.get('/products/:product_id')
    //       .then((products) => {
    //         console.log('products data', products)
    //       })
    //       .catch(err => {
    //         console.log(`err in product get: ${err}`);
    //       })
    // console.log(`example products: ${JSON.stringify(products)}`)
  }

  render() {
    return (
      <div className='relatedProducts'>
        <RelatedProductsList products={this.state.products} />
        <YourOutfitList />
      </div>
      )
  }
}

