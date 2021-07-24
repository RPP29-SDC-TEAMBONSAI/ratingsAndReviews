import React from 'react';
import propTypes from 'prop-types';

const Search = (props) => {
  return (
    <form className='searchAnswerForm'>
      <input className='searchBtn' type="submit" value='Search'></input>
      <div className='inputBox'>
        <input
          className='search'
          type='text'
          value={props.currentInput}
          name='question'
          onChange={props.questionSearchChange}>
        </input>
      </div>
    </form>
  )
}

Search.propTypes = {
  searchFilter: propTypes.func.isRequired,
  currentInput: propTypes.string.isRequired,
  questionSearchChange: propTypes.func.isRequired
}

export default Search;