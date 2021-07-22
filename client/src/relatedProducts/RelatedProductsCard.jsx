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
          <h2 className='productName'>{this.props.name}</h2>
          <span className="material-icons actionStar">star</span><span className="material-icons actionStar">star</span><span className="material-icons actionStar">star</span><span className="material-icons actionStar">star</span><span className="material-icons actionStar">star</span>
          <h3 className='productCategory'>{this.props.category}</h3>
          <h3 className='defaultProductPrice'>{this.props.defaultPrice}</h3>
          {/* <img className='cardImage' href='tinyurl.com/5h4ad7ks'></img> */}
          <p className='starRating'>XXXXX</p>
      </div>
    )
  }
}

