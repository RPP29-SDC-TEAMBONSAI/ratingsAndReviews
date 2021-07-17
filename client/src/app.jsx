import React from 'react';
import ReactDOM from 'react-dom';
import sum from './jest-example/example';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    axios.get('/qa/questions')
      .then(q_a_data => {
        console.log(data)
        console.log('req fired')

        axios.get()
      })


  }

  render() {
    return (
      <div>{`Hello Sum 1 + 1 = ${sum(1, 1)}`}</div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));