import React from 'react';
import BreakdownClickable from './BreakdownClickable.jsx';

const RatingBreakdown = (props) => {
  return (
    <div className="rating-breakdown">
      <BreakdownClickable stars={5} percent={55}/>
      <BreakdownClickable stars={4} percent={35}/>
      <BreakdownClickable stars={3} percent={100}/>
      <BreakdownClickable stars={2} percent={45}/>
      <BreakdownClickable stars={1} percent={25}/>
    </div>
  );
};

export default RatingBreakdown;