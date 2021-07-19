import React from 'react';
import axios from 'axios';
import ProductInfo from './components/ProductInfo.jsx';
import AddToCart from './components/AddToCart.jsx';
import StyleSelector from './components/StyleSelector.jsx';
import ImageGallery from './components/ImageGallery.jsx';

class Overview extends React.Component {
  constructor (props) {
    super (props)

    this.state = {

    }

  }



  render() {
    return (
      <div> Overview
        <ProductInfo />
        <StyleSelector />
        <AddToCart />
        <ImageGallery />



      </div>

    )
  }
}

export default Overview;