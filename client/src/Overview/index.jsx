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
    this.state = {
      styleIndex: 0,
      quantityAvailable: 0,
      quantitySelected: 0,
      sizeSelected: '',
      bag: [],
      mainPhoto: 0

    }
    this.changeAvailableQuantity = this.changeAvailableQuantity.bind(this);
    this.addToBag = this.addToBag.bind(this);
    this.changeSelectedQuantity = this.changeSelectedQuantity.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.changeMainPhoto = this.changeMainPhoto.bind(this);
  }

  changeStyle (e) {
    this.setState({
      styleIndex: e.target.attributes.value.value,
      sizeSelected: '',
      quantitySelected: 0,
      mainPhoto: 0
    })

  }

  changeAvailableQuantity (e) {
   let split = e.target.value.split(' ');
    this.setState({
      quantityAvailable: split[0],
      sizeSelected: split[1]
    })
  }

  changeSelectedQuantity (e) {
    this.setState({
      quantitySelected: e.target.value
    })
  }

  changeMainPhoto (e) {
    this.setState({
      mainPhoto: e.target.attributes.value.value

    })
  }

  addToBag () {
    if (this.state.sizeSelected.length === 0) {
      alert('Please Select Size')

    } else {

      let item = {product_id: this.props.state.product_id,
        styleIndex: this.state.styleIndex,
        size: this.state.sizeSelected,
        quantity: this.state.quantitySelected}

        let cart = this.state.bag;
        cart.push(item);


        this.setState({
          bag: cart
        })

      }
  }


  render() {
    return (
      <div className = "overview">
        <div className = "column-one">
        <ImageGallery state = {this.props.state} OverviewState = {this.state} changeMainPhoto = {this.changeMainPhoto}/>
        </div>
        <div className = "column-two">
        <ProductInfo state = {this.props.state} OverviewState = {this.state}/>
        <StyleSelector state = {this.props.state} OverviewState = {this.state} changeStyle = {this.changeStyle}/>
        <AddToCart state = {this.props.state} OverviewState = {this.state}
        changeAvailableQuantity = {this.changeAvailableQuantity} addToBag = {this.addToBag}
        changeSelectedQuantity = {this.changeSelectedQuantity}/>
        </div>

      </div>

    )
  }
}

export default Overview;