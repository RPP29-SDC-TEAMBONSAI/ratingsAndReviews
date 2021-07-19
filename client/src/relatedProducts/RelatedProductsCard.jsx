import React from 'react';

export default class RelatedProductsCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
      <div className='relatedProductsCard'>
          <h2 className='productName'>Sleeveless Tux</h2>
          <h3 className='productCategory'>Formalwear</h3>
          <p className='productPrice'>$49.99</p>
          <img className='cardImage' href='tinyurl.com/5h4ad7ks'></img>
          <p className='starRating'>XXXXX</p>
      </div>
    )
  }
}

