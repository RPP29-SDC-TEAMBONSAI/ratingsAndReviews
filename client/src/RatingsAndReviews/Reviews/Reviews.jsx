import React from 'react';
import PropTypes from 'prop-types';
import ReviewsHeader from './ReviewsHeader.jsx';
import ReviewsList from './ReviewsList.jsx';
import { reviews, reviewsMeta } from '../../clientRoutes/reviews.js';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      loaded: 0
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
    reviews(1, 1000, 'newest', this.props.product_id)
      .then(({ data }) => {
        this.setState({
          reviews: data,
          loaded: 2
        });
      })
      .catch(err => console.log("REVIEWS MOUNT ERR", err));
  }

  render() {
    return (
      <div className="reviews">
        <ReviewsHeader
          starFilters={this.props.starFilters}
          starFilterClick={this.props.starFilterClick}
          numReviews={this.state.reviews.length}/>
        <ReviewsList
          reviews={this.state.reviews}
          loaded={this.state.loaded}/>
      </div>
    );
  }
};

Reviews.propTypes = {
  product_id: PropTypes.number,
  starFilters: PropTypes.array,
  starFilterClick: PropTypes.func
}

export default Reviews;