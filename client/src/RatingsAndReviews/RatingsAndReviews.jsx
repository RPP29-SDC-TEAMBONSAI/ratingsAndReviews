import React from 'react';
import RatingsBreakdown from './RatingsBreakdown/RatingsBreakdown.jsx';
import Reviews from './Reviews/Reviews.jsx';
import PropTypes from 'prop-types';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starFilters: []
    };
    this.setStarFilter = this.setStarFilter.bind(this);
  };

  setStarFilter(event) {
    let stars = event.target.getAttribute('star');
    let filters = this.state.starFilters.slice();
    let index = filters.indexOf(stars);

    if (index !== -1) {
      filters.splice(index, 1);
    } else {
      filters.push(stars);
    }

    this.setState({
      starFilters: filters.sort().reverse()
    });
  }

  render() {
    return (
      <div className="ratings-and-reviews" id="link_to_reviews">
        <RatingsBreakdown
          product_id={this.props.product_id}
          starFilterClick={this.setStarFilter}/>
        <Reviews
          product_id={this.props.product_id}
          starFilters={this.state.starFilters}
          starFilterClick={this.setStarFilter}/>
      </div>
    );
  };
};

RatingsAndReviews.propTypes = {
  product_id: PropTypes.number
}

export default RatingsAndReviews;