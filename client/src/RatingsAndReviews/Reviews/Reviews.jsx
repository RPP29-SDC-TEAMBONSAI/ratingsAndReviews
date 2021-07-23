import React from 'react';
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
  };

  componentDidMount() {
    reviews(1, 1000, 'newest', 28212)
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
        <ReviewsHeader/>
        <ReviewsList
          reviews={this.state.reviews}
          loaded={this.state.loaded}/>
      </div>
    );
  }
};

export default Reviews;