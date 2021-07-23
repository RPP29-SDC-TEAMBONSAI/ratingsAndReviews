import React from 'react';
import BreakdownClickable from './BreakdownClickable.jsx';
import PropTypes from 'prop-types';

const RatingBreakdown = (props) => {
  return (
    <div className="rating-breakdown">
      <BreakdownClickable stars={5} percent={props.percentages[4]} count={props.counts[4]}/>
      <BreakdownClickable stars={4} percent={props.percentages[3]} count={props.counts[3]}/>
      <BreakdownClickable stars={3} percent={props.percentages[2]} count={props.counts[2]}/>
      <BreakdownClickable stars={2} percent={props.percentages[1]} count={props.counts[1]}/>
      <BreakdownClickable stars={1} percent={props.percentages[0]} count={props.counts[0]}/>
    </div>
  );
};

RatingBreakdown.propTypes = {
  percentages: PropTypes.array,
  counts: PropTypes.array
}

export default RatingBreakdown;