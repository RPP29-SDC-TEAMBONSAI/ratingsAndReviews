import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <form>
        <input className='search' type='text' value='temp' name='question'></input>
        <input type="submit" value='Search'></input>

      </form>
    )
  }
}
export default Search;