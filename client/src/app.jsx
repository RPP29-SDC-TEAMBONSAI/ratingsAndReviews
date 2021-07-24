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
      qNa: []

    }
    this.searchQuestionHandler = this.searchQuestionHandler.bind(this)

  }
  componentDidMount() {
    Promise.all([
      // REVIEW REQUESTS
      reviews(), reviewsMeta(),
      // PRODUCT REQUESTS
      products(), productsWithId(this.state.product_id), productsStyle(this.state.product_id), productsRelated(),
      // QNA REQUESTS
      questions(), answers(),
      // CART REQUESTS
      cart()
    ])
      .then((results) => {
        this.setState({
          productId: results[3].data.id,
          productInformation: results[3].data,
          styles: results[4].data,
          qNa: this.props.qNaTestData
        });
      })
      .catch((err) => {
        console.log('this is the err 🥲 ', err)
      });
  }

  searchQuestionHandler(newState) {
    console.log(newState)
    this.setState({
      qNa: newState
    })

  }

  render() {
    return (
      <div className='app'>
        <Overview state = {this.state}/>
        <RelatedProducts state={this.state} />
        <QuestionsNAnswers data={this.state.qNa} searchQuestionHandler={this.searchQuestionHandler}/>
        <RatingsAndReviews />
      </div>
    )
  }
}

App.propTypes ={
  qNaTestData: propTypes.array.isRequired
}




ReactDOM.render(<App qNaTestData={qNa}/>, document.getElementById('app'));

