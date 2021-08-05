import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './Overview/index.jsx'
import RelatedProducts from './RelatedProducts/RelatedProductsView/RelatedProducts.jsx';
import QuestionsNAnswers from './questions-n-answers/qNa.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
import propTypes from 'prop-types';

// CLIENT ROUTES
import { reviews, reviewsMeta } from "./clientRoutes/reviews.js";
import { products, productsWithId, productsStyle, productsRelated } from "./clientRoutes/products.js";
import { questions, getReported } from "./clientRoutes/qa.js";
import { cart } from "./clientRoutes/cart.js";

//questions/answers test data

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 28212,
      productInformation: {},
      styles: [],
      relatedProducts: [],
      qNa: [],
      savedQnA: [],
      loaded: false,
      ratings: {}
    }
    this.handleProductChange = this.handleProductChange.bind(this);
    this.getStateData = this.getStateData.bind(this);
  }

  componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const product = params.product_id || this.state.product_id;
    console.log(params)
    this.getStateData(product);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.product_id !== this.state.product_id) {
      this.getStateData(this.state.product_id)

    }
  }

  handleProductChange(newProductId) {
    this.setState({
      product_id: newProductId
    })
  }

  getStateData(product_id) {
    this.setState({
      loaded: false
    })
    Promise.all([
      products(),
      productsWithId(product_id),
      productsStyle(product_id),
      productsRelated(product_id),
      questions(product_id),
      reviewsMeta(product_id),
      cart()

    ])
      .then((results) => {
        console.log(results[2].data)
        this.setState({

          productInformation: results[1].data,
          styles: results[2].data,
          relatedProducts: results[3].data,
          //do not remove please
          qNa: results[4].data,
          savedQnA: results[4].data,
          currentItemName:results[1].data.name,
          product_id:results[1].data.id,
          ratings: results[5].data.ratings
          //do not remove

        })
      })
      .then(() => {
        this.setState({
          loaded: true,

        })
      })
      .catch((err) => {
        console.log('this is the err 🥲 ', err)
      });
  }

  render() {

    if (this.state.loaded) {
      return (
        <div className='app'>
          <Overview
            state = {this.state}/>
          <RelatedProducts
            state={this.state}
            handleProductChange={this.handleProductChange}/>
          <QuestionsNAnswers
            product_id={this.state.product_id}
            data={this.state.qNa}
            QuestionSavedData ={this.state.savedQnA}
            currentItemName={this.state.currentItemName}/>
          <RatingsAndReviews
            product_id={28213}/>
        </div>
      )
    } else {
      return <div>Loading</div>
    }
  }
}

App.propTypes ={
  qNaTestData: propTypes.array.isRequired

}

ReactDOM.render(<App />, document.getElementById('app'));

