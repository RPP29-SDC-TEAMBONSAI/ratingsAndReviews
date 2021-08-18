import React from 'react';
import propTypes from 'prop-types';

const Search = (props) => {
  return (
    <div className='search container'>

      <input
        onClick={(e) => props.recordClick(e)}
        className='searchInput'
        type='text'
        placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'
        name='question'
        onChange={(e) => props.questionSearchChange(e)}>
      </input>

      <input className='searchBtn' type="submit" value='Search'></input>
    </div>
  )
}

Search.propTypes = {
  recordClick:propTypes.func.isRequired,
  currentInput: propTypes.string.isRequired,
  questionSearchChange: propTypes.func.isRequired
}

export default Search;