import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: 'HAVE A QUESTION? SEARCH FOR ANSWERS...'
    }
    this.questionInputChange = this.questionInputChange.bind(this)
  }

  questionInputChange(e) {
    console.log(e.target.value)
    this.setState({
      value: e.target.value
    })


  }

  render() {
    return (
      <form className='searchAnswerForm'>
        <input className='searchBtn' type="submit" value='Search'></input>
        <div className='inputBox'><input className='search' type='text' value={this.state.value} name='question' onChange={this.questionInputChange}></input></div>

      </form>
    )
  }
}

export default Search;