import React from 'react';
import PropTypes from 'prop-types';
import ReviewsHeader from './ReviewsHeader.jsx';
import ReviewsList from './ReviewsList.jsx';
import { reviews, reviewsMeta } from '../../clientRoutes/reviews.js';
import helper from '../../helper-functions/rnRHelper.js';
const { sortByRelevance } = helper;

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      loaded: 0,
      sortBy: 'newest'
    };

    this.getStateData = this.getStateData.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
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
        sortByRelevance(data)
        this.setState({
          reviews: data,
          loaded: 2
        });
      })
      .catch(err => console.log("REVIEWS MOUNT ERR", err));
  }

  handleSortChange(event) {
    console.log(event.target.value)
    this.setState({
      sortBy: event.target.value
    });
  }

  render() {
    return (
      <div className="reviews">
        <ReviewsHeader
          starFilters={this.props.starFilters}
          starFilterClick={this.props.starFilterClick}
          numReviews={this.state.reviews.length}
          handleSortChange={this.handleSortChange}
          sortBy={this.state.sortBy}/>
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