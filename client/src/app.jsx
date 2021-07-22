import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './Overview/index.jsx'
import RelatedProducts from './relatedProducts/RelatedProducts.jsx';
import QuestionsNAnswers from './questions-n-answers/qNa.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';

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
      qNa: props.qNaTestData

    }
  }
  componentDidMount() {
    Promise.all([
      // REVIEW REQUESTS
      reviews(), reviewsMeta(),
      // PRODUCT REQUESTS
      products(), productsWithId(), productsStyle(), productsRelated(),
      // QNA REQUESTS
      questions(), answers(),
      // CART REQUESTS
      cart()
    ])
      .then((results) => {
        this.setState({
          productId: results[3].data.id,
          productInformation: results[3].data,
          styles: results[4].data
        });
        console.log(results);
      })
      .catch((err) => {
        console.log('this is the err 🥲 ', err)
      });
  }

  render() {
    return (
      <div className='app'>
        <Overview state = {this.state}/>
        <RelatedProducts />
        <QuestionsNAnswers data={this.state.qNa}/>
        <RatingsAndReviews />
      </div>
    )
  }
}


ReactDOM.render(<App qNaTestData={qNa}/>, document.getElementById('app'));

