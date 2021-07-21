import React from 'react';
import Factor from './Factor.jsx';

const ProductBreakdown = (props) => {
  return (
    <div className="product-breakdown">
      <Factor title="Size" levels={['Too small', 'Perfect', 'Too large']} percent={60}/>
      <Factor title="Comfort" levels={['Poor', 'Perfect']} percent={20}/>
    </div>
  );
};

export default ProductBreakdown;