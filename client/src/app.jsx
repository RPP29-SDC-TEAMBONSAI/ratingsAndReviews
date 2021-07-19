import React from 'react';
import ReactDOM from 'react-dom';
import sum from './jest-example/example';
import RelatedProducts from './relatedProducts/RelatedProducts.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className='app'>

      <div>{`Hello Sum 1 + 1 = ${sum(1, 1)}`}</div>
      <RelatedProducts />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));