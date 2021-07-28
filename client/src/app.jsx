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
import { questions, answers } from "./clientRoutes/qa.js";
import { cart } from "./clientRoutes/cart.js";

//questions/answers test data
import qNa_testData from '../../tests/QnA-testData';

let qNa = qNa_testData.results

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 28212,
      productInformation: {},
      styles: [],
      qNa: [],
      savedQnA: [],
      loaded: false
    }
    this.handleProductChange = this.handleProductChange.bind(this);
    this.getStateData = this.getStateData.bind(this);
  }

  componentDidMount() {
    this.getStateData();
    this.setState({
      loaded: true
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.product_id !== this.state.product_id) {
      this.getStateData();
    }
  }

  handleProductChange(newProductId) {
    this.setState({
      product_id: newProductId
    })
  }

  getStateData() {
    Promise.all([
      products(), productsWithId(this.state.product_id), productsStyle(this.state.product_id), productsRelated(),
      questions(this.state.product_id),
      cart()
    ])
      .then((results) => {

        this.setState({
          productInformation: results[1].data,
          styles: results[2].data,
          qNa: results[4].data,
          savedQnA: results[4].data,
          productName: results[1].data.name
        });
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
            currentItemName={this.state.productName}/>
          <RatingsAndReviews
            product_id={this.state.product_id}/>
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




ReactDOM.render(<App qNaTestData={qNa}/>, document.getElementById('app'));

