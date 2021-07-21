import React from 'react';
import axios from 'axios';
import ProductInfo from './components/ProductInfo.jsx';
import AddToCart from './components/AddToCart.jsx';
import StyleSelector from './components/StyleSelector.jsx';
import ImageGallery from './components/ImageGallery.jsx';

class Overview extends React.Component {
  constructor (props) {
    super (props)
    this.props = props;
  }



  render() {
    return (
      <div>
        <ProductInfo state = {this.props.state}/>
        <StyleSelector state = {this.props.state}/>
        <AddToCart state = {this.props.state}/>
        <ImageGallery state = {this.props.state}/>



      </div>

    )
  }
}

export default Overview;