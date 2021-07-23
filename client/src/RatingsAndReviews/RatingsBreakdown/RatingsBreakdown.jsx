import React from 'react';
import RatingSummary from './RatingSummary.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import { reviews, reviewsMeta } from '../../clientRoutes/reviews.js';
import helper from '../../helper-functions/rnRHelper.js';
const { ratingsToTotalAndAverage, recommendedToPercentage } = helper;

class RatingsBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalRatings: 0,
      averageRating: 0,
      recommendPercentage: 0,
    };
  };

  componentDidMount() {
    reviewsMeta(28212)
    .then(({ data }) => {
      const { count, average } = ratingsToTotalAndAverage(data.ratings);
      const recommendPercentage = recommendedToPercentage(data.recommended);
      console.log('COUNT:', count);
      console.log('AVERAGE:', average);
      console.log('RPERCENT:', recommendPercentage);
      this.setState({
        totalRatings: count,
        averageRating: average,
        recommendPercentage: recommendPercentage
      });
    })
    .catch(err => console.log("REVIEWS MOUNT ERR", err));
  }

  render() {
    return (
      <div className="ratings-breakdown">
        <RatingSummary
          total={this.state.totalRatings}
          average={this.state.averageRating}
          percent={this.state.recommendPercentage}/>
        <RatingBreakdown/>
        <ProductBreakdown/>
      </div>
    )
  };
};

export default RatingsBreakdown;