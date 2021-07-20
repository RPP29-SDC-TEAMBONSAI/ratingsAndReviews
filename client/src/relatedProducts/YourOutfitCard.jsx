import React from 'react';

export default class YourOutfitCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
      <div className='yourOutfitCard'>
          <button className='addToOutfitButton'>+</button>
          <h2 className='productName'></h2>
          <h3 className='productCategory'></h3>
          <p className='productPrice'></p>
          <img className='cardImage' href='tinyurl.com/5h4ad7ks'></img>
          <p className='starRating'></p>
      </div>
    )
  }
}

