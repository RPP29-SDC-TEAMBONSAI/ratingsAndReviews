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
      sortBy: 'newest',
      photo: null,
      photoOpen: false
    };

    this.getStateData = this.getStateData.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.viewPhoto = this.viewPhoto.bind(this);
    this.loadTwoMore = this.loadTwoMore.bind(this);
  };

  componentDidMount() {
    this.getStateData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.product_id !== prevProps.product_id) {
      this.getStateData();
    }
  }

  getStateData() {
    reviews(1, 1000, 'newest', this.props.product_id)
      .then(({ data }) => {
        // sortByRelevance(data);
        this.setState({
          reviews: data,
          loaded: 1
        });
      })
      .catch(err => console.log("REVIEWS MOUNT ERR", err));
  }

  handleSortChange(event) {
    this.setState({
      sortBy: event.target.value
    });
  }

  viewPhoto(event) {
    this.setState({
      photoOpen: !this.state.photoOpen,
      photo: event.target.getAttribute("src")
    });
  }

  loadTwoMore() {
    this.setState({loaded: this.state.loaded + 2})
  }

  render() {
    return (
      <div>
        <div
          className="review-photo-open"
          style={{display: this.state.photoOpen ? "block" : "none"}}
          onClick={this.viewPhoto}>
            <img className="review-photo-url" src={this.state.photo}/>
        </div>
        <div className="reviews">
          <ReviewsHeader
            starFilters={this.props.starFilters}
            starFilterClick={this.props.starFilterClick}
            numReviews={this.state.reviews.length}
            handleSortChange={this.handleSortChange}
            sortBy={this.state.sortBy}/>
          <ReviewsList
            reviews={this.state.reviews}
            loaded={this.state.loaded}
            viewPhoto={this.viewPhoto}/>
          <div className="review-buttons">
            <button
              className="review-button"
              onClick={this.loadTwoMore}
              style={{display: this.state.reviews.length - 1 <= this.state.loaded ? "none" : "inline-block"}}>
                MORE REVIEWS
            </button>
            <button className="review-button">ADD A REVIEW +</button>
          </div>
        </div>
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