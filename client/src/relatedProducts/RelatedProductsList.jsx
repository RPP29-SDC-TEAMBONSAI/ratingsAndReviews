import React from 'react';
import RelatedProductsCard from './RelatedProductsCard';


class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render () {
    return (
      <div className='relatedProductsList'>
        <RelatedProductsCard />
      </div>
    )
  }
}

module.exports = RelatedProductsList;