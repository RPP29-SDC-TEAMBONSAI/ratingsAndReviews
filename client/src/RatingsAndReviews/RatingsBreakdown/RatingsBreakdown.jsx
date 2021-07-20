import React from 'react';
import RatingSummary from './RatingSummary.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

class RatingsBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div className="ratings-breakdown">
        <RatingSummary/>
        <RatingBreakdown/>
        <ProductBreakdown/>
      </div>
    )
  };
};

export default RatingsBreakdown;