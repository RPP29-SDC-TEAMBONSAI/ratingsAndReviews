import React from 'react';
import ReactDOM from 'react-dom';
import sum from './jest-example/example';
import axios from 'axios'
import Overview from './Overview/index.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

    // below looks really bad and honestly there is probably a way better way to implement our get requests.
    // because we are going for MVP it has been left as is for now, because its working.
    // this is a tech debt - refactor componentDidMount requests to look nice

    //for Atelier Products component get requests
    axios.get('/products')
      .then((product_data) => {
        console.log('products', product_data)

        axios.get('/products/:product_id')
          .then((products) => {
            console.log('products data', products)

            axios.get('/products/:product_id/styles')
              .then((product_styles) => {
                console.log('product styles', product_styles)

                axios.get('/products/:product_id/related')
                  .then((related_products) => {

                    console.log('related products', related_products)
                    //for reviews component get requests
                    axios.get('/reviews')
                      .then((reviews) => {
                        console.log('reviews', reviews)

                        axios.get('/reviews/meta')
                          .then((reviews_meta) => {

                            console.log('reviews meta', reviews_meta)
                            //for q/a component get requests
                            axios.get('/qa/questions')
                              .then((questions) => {
                                console.log('questions', questions)

                                axios.get('/qa/questions/:question_id/answers')
                                  .then((answers) => {
                                    console.log('answers', answers)
                                    //for cart component get requests
                                    axios.get('/cart')
                                      .then((cart) =>{
                                        console.log('cart', cart)

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
      <div>{`Hello Sum 1 + 1 = ${sum(1, 1)}`}
      <Overview/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));