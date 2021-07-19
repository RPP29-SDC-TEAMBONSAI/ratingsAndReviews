import React from 'react';
import YourOutfitCard from './YourOutfitCard.jsx';

export default class YourOutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
      <div className='yourOutfitListContainer'>
        <h2>Your Outfit: </h2>
      <div className='yourOutfitList'>
        <YourOutfitCard />
        <YourOutfitCard />
        <YourOutfitCard />
      </div>
      </div>
    )
  }
}

