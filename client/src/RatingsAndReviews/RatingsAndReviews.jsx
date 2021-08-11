import React from 'react';
import RatingsBreakdown from './RatingsBreakdown/RatingsBreakdown.jsx';
import Reviews from './Reviews/Reviews.jsx';
import PropTypes from 'prop-types';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starFilters: [],
      hidden: false,
      characteristics: {}
    };
    this.setStarFilter = this.setStarFilter.bind(this);
    this.hideIfNoReviews = this.hideIfNoReviews.bind(this);
    this.setCharacteristics = this.setCharacteristics.bind(this);
  };

  setStarFilter(event) {
    let stars = parseInt(event.target.getAttribute('star'));
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

  hideIfNoReviews(bool) {
    this.setState({
      hidden: bool
    });
  }

  setCharacteristics(data) {
    this.setState({
      characteristics: data
    });
  }

  render() {
    return (
      <div className="ratings-and-reviews" id="link_to_reviews" style={{display: this.state.hidden ? "none" : "flex"}}>
        <RatingsBreakdown
          product_id={this.props.product_id}
          starFilterClick={this.setStarFilter}
          hideIfNoReviews={this.hideIfNoReviews}
          setCharacteristics={this.setCharacteristics}/>
        <Reviews
          product_id={this.props.product_id}
          starFilters={this.state.starFilters}
          starFilterClick={this.setStarFilter}
          characteristics={this.state.characteristics}/>
      </div>
    );
  }
};

RatingsAndReviews.propTypes = {
  product_id: PropTypes.number
}

export default RatingsAndReviews;