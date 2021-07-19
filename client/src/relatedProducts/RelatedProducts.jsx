import React from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';


export default class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className='relatedProducts'>
        <RelatedProductsList  />
        <YourOutfitList />
      </div>
      )
  }
}

