import React from 'react';
import PropTypes from 'prop-types';
import RatingSummary from './RatingSummary.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import { reviews, reviewsMeta } from '../../clientRoutes/reviews.js';
import helper from '../../helper-functions/rnRHelper.js';
const { ratingsToTotalAverageAndPercentages, recommendedToPercentage, mapCharacteristicsToProps } = helper;

class RatingsBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalRatings: 0,
      averageRating: 0,
      countsForEach: [],
      percentages: [],
      recommendPercentage: 0,
      characteristics: []
    };
    this.getStateData = this.getStateData.bind(this);
  };

  componentDidMount() {
    this.getStateData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.product_id !== prevProps.product_id) {
      getStateData();
    }
  }

  getStateData() {
    reviewsMeta(this.props.product_id)
    .then(({ data }) => {
      const { count, average, countsForEach, percentages } = ratingsToTotalAverageAndPercentages(data.ratings);
      const recommendPercentage = recommendedToPercentage(data.recommended);
      const characteristics = mapCharacteristicsToProps(data.characteristics);

      this.setState({
        totalRatings: count,
        averageRating: average,
        countsForEach: countsForEach,
        percentages: percentages,
        recommendPercentage: recommendPercentage,
        characteristics: characteristics
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
        <RatingBreakdown
          percentages={this.state.percentages}
          counts={this.state.countsForEach}/>
        <ProductBreakdown
          characteristics={this.state.characteristics}/>
      </div>
    )
  };
};

RatingsBreakdown.propTypes = {
  product_id: PropTypes.number
}

export default RatingsBreakdown;