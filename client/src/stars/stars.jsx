import React from "react";

/* content contains unicode characters 200A is "HAIR SPACE" 2605 is a star */
const star = "\u2605";
const shrt = "\u200A";
const seq = shrt + star + shrt;
const defaultCb = () => { return }

const getStarDivWithClassName = (name, style, cb) => {
  return <div className={name} style={style}>
    <a starnum="1" onClick={cb}>{seq}</a>
    <a starnum="2" onClick={cb}>{seq}</a>
    <a starnum="3" onClick={cb}>{seq}</a>
    <a starnum="4" onClick={cb}>{seq}</a>
    <a starnum="5" onClick={cb}>{seq}</a>
  </div>;
}

const Stars = (stars, cb) => {
  const nearestQuartTimesTwenty = Math.round(stars * (1/0.25)) / (1/0.25) * 20;
  return (
    <div className="stars">
      {getStarDivWithClassName("empty-stars", {}, cb || defaultCb)}
      {getStarDivWithClassName("full-stars", {width: `${nearestQuartTimesTwenty}%`}, cb || defaultCb)}
    </div>
  )
}

export default Stars;