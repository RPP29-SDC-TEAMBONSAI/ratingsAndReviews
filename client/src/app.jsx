import React from 'react';
import ReactDOM from 'react-dom';
import sum from './jest-example/example';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>{`Hello Sum 1 + 1 = ${sum(1, 1)}`}</div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));