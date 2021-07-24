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
      bag: []

    }
    this.changeAvailableQuantity = this.changeAvailableQuantity.bind(this);
    this.addToBag = this.addToBag.bind(this);
    this.changeSelectedQuantity = this.changeSelectedQuantity.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
  }

  changeStyle (e) {
    this.setState({
      styleIndex: e.target.attributes.value.value,
      sizeSelected: '',
      quantitySelected: 0
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

  addToBag () {
    if (this.state.sizeSelected.length === 0) {
      alert('Please Select Size')

    } else {

      let item = {product_id: this.props.state.product_id,
        styleIndex: this.state.styleIndex,
        size: this.state.sizeSelected,
        quantity: this.state.quantitySelected}
        console.log('item', item)

        this.setState({
          bag: this.state.bag.push(item)

        })
      }




  }


  render() {
    return (
      <div>
        <ProductInfo state = {this.props.state} OverviewState = {this.state}/>
        <StyleSelector state = {this.props.state} OverviewState = {this.state} changeStyle = {this.changeStyle}/>
        <AddToCart state = {this.props.state} OverviewState = {this.state}
        changeAvailableQuantity = {this.changeAvailableQuantity} addToBag = {this.addToBag}
        changeSelectedQuantity = {this.changeSelectedQuantity}/>
        <ImageGallery state = {this.props.state} OverviewState = {this.state}/>
      </div>

    )
  }
}

export default Overview;