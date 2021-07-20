import React from 'react';
import BreakdownClickable from './BreakdownClickable.jsx';

const RatingBreakdown = (props) => {
  return (
    <div className="rating-breakdown">
      <BreakdownClickable stars={5} percent={50}/>
      <BreakdownClickable stars={4} percent={20}/>
      <BreakdownClickable stars={3} percent={15}/>
      <BreakdownClickable stars={2} percent={10}/>
      <BreakdownClickable stars={1} percent={5}/>
    </div>
  );
};

export default RatingBreakdown;