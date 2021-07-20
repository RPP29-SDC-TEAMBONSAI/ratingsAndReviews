import React from 'react';
import RelatedProductsCard from './RelatedProductsCard.jsx';


export default class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render () {
    return (
      <div className='relatedProductsListContainer'>
        <h2>Related Products:</h2>
      <div className='relatedProductsList'>
        <RelatedProductsCard />
        <RelatedProductsCard />
        <RelatedProductsCard />
      </div>
      </div>
    )
  }
}

