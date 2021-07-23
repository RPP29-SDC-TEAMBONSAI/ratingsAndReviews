import React from 'react';
import PropTypes from 'prop-types';

const Factor = (props) => {
  console.log(props);
  return (
    <div className="factor">
      <div className="factor-title">{props.title}</div>
      <div className="factor-levels">
        <a className="icon" style={{left: `calc(${props.percent}% - 8px)`}}>▼</a>
        {props.levels.map((level, index) => {
          return <div key={index} className="factor-level-section"></div>
        })}
      </div>
      <div className="factor-labels">
        {props.levels.map((level, index) => {
          let pos = '';
          if (index === 0) { pos = '-first' };
          if (index + 1 === props.levels.length) { pos = '-last' };
          return <div key={level + index} className={`factor-label${pos}`}>{level}</div>
        })}
      </div>
    </div>
  );
};

Factor.propTypes = {
  title: PropTypes.string,
  levels: PropTypes.array,
  percent: PropTypes.number,
}

export default Factor;