import React from 'react';
import ReviewsHeader from './ReviewsHeader.jsx';
import ReviewsList from './ReviewsList.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div className="reviews">
        <ReviewsHeader/>
        <ReviewsList reviews={[{abc: 'abc'}, {def: 'def'}]}/>
      </div>
    );
  }
};

export default Reviews;