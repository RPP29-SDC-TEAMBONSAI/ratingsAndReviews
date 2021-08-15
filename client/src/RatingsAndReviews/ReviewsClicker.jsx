import React from 'react';
import { reviewsInteraction } from '../clientRoutes/reviews.js'

const ReviewsClicker = (Component) => {
  class ReviewsClicker extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return <Component recordClick={reviewsInteraction} {...this.props}/>
    }
  }
  return ReviewsClicker;
}

export default ReviewsClicker;