import React from 'react';
import YourOutfitCard from './YourOutfitCard';

class YourOutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
      <div className='yourOutfitList'>
        <YourOutfitCard />
      </div>
    )
  }
}

module.exports = YourOutfitList;