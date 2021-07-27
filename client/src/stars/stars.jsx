import React from 'react';

const Stars = (stars) => {
  const nearestQuartTimesTwenty = Math.round(stars * (1/0.25)) / (1/0.25) * 20;
  return (
    <div className="stars">
      <div className="empty-stars"></div>
      <div className="full-stars" style={{width: `${nearestQuartTimesTwenty}%`}}></div>
    </div>
  )
}

export default Stars;