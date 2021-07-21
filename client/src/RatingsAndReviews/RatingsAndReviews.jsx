import React from 'react';
import RatingsBreakdown from './RatingsBreakdown/RatingsBreakdown.jsx';
import Reviews from './Reviews/Reviews.jsx';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div className="ratings-and-reviews">
        <RatingsBreakdown props={this.props.productId}/>
        <Reviews props={this.props.productId}/>
      </div>
    );
  };
};


export default RatingsAndReviews;