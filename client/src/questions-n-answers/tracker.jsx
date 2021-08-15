import React from 'react';
import {interactions} from '../clientRoutes/qa'
import propTypes from 'prop-types';


class ClickTracker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      interactions: [],


    }
    this.recordClick = this.recordClick.bind(this)
  }
  recordClick(e) {
    // console.log(new Date(e.timeStamp))

    let newResults =this.state.interactions.slice();
    if (newResults.length > 5) {
      console.log('ready to be sent')
      //send array of interactions to server to be posted
      return interactions(newResults)
        .then(data => {
          // console.log(data, 'qa interactions data posted to API')
          this.setState({
            interactions:[]
          })
        })
    //reset state of interactions after ok response is received from server
    }
    let ele = e.target.className;
    let recordObj = {
      element: ele,
      widget: 'QA Widget',
      time: new Date(Date.now(e.target.timeStamp))

    }
    newResults.push(recordObj)
    this.setState({
      interactions: newResults
    })

  }
  render(){
    const renderProps = {

      recordClick: this.recordClick
    }
    return typeof this.props.children === 'function'
      ? this.props.children(renderProps)
      : this.props.children
  }

}

ClickTracker.propTypes = {
  children: propTypes.any

}

export default ClickTracker;