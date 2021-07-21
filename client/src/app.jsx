import React from 'react';
import ReactDOM from 'react-dom';
import sum from './jest-example/example';
import axios from 'axios'
import Overview from './Overview/index.jsx'
import RelatedProducts from './relatedProducts/RelatedProducts.jsx';
import QuestionsNAnswers from './questions-n-answers/qNa.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 28212,
      productInformation: {},
      styles: []

    }
  }
  componentDidMount() {
    axios.get('/products')
      .then((product_data) => {
        axios.get('/products/:product_id')
          .then((products) => {
            this.setState({
              productInformation: products.data
            })
            axios.get('/products/:product_id/styles')
              .then((product_styles) => {
                this.setState({
                  styles: product_styles.data
                })
                axios.get('/products/:product_id/related')
                  .then((related_products) => {
                    //for reviews component get requests
                    axios.get('/reviews')
                      .then((reviews) => {


                        axios.get('/reviews/meta')
                          .then((reviews_meta) => {


                            //for q/a component get requests
                            axios.get('/qa/questions')
                              .then((questions) => {


                                axios.get('/qa/questions/:question_id/answers')
                                  .then((answers) => {

                                    //for cart component get requests
                                    axios.get('/cart')
                                      .then((cart) =>{


                                      })
                                  })
                              })
                          })
                      })
                  })
              })
          })
      })
      .catch(err => {
        console.log('this is the err 🥲 ', err)
      })
  }

  render() {
    return (
      <div className='app'>
      <Overview state = {this.state}/>
      <RelatedProducts />
      <QuestionsNAnswers />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));