import React from 'react';

const withClickTracker= WrappedComponent => {
  class WithClickTracker extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        interactions: [],
        count: 0
      }
      this.recordCount = this.recordCount.bind(this);
    }

    recordCount(e) {
      e.stopPropagation();
      let interaction = {
        element: e.target.nodeName,
        className: e.target.className || null,
        time: new Date(Date.now(e.target.timeStamp)),
        module: 'Related Products'
      }
      //console.log(interaction)

      this.setState(prevState => {
        return {
          interactions: [...prevState.interactions, interaction],
          count: prevState.count + 1
        }
      })

    }

    render () {
      return (
        <WrappedComponent
        count={this.state.count}
        recordCount={this.recordCount}
        {...this.props}
         />
      )
    }
  }
  return WithClickTracker;
}

export default withClickTracker;