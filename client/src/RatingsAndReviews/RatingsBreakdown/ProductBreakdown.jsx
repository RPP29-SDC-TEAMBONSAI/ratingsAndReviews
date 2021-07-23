import React from 'react';
import Factor from './Factor.jsx';
import PropTypes from 'prop-types';

const ProductBreakdown = (props) => {
  console.log(props);
  return (
    <div className="product-breakdown">
      {props.characteristics.map((char) => {
        return <Factor {...char}/>
      })}
    </div>
  );
};

ProductBreakdown.propTypes = {
  characteristics: PropTypes.array
}

export default ProductBreakdown;