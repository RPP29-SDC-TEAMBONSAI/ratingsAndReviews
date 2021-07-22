import React from 'react';

const AddToCart = (props) =>  {
  if (props.state.styles.length > 0) {
  return (
    <div>
      <select className = "selectSize">
        <option>SELECT SIZE</option>
        {Object.entries(props.state.styles[2].skus).map(([key, value]) =>{
          console.log('value', value)
          if (value.quantity > 0) {

            return (

              <option>{value.size}</option>
            )
          }

        })}
      </select>
      <select className = "quantity">
        <option>1</option>
      </select>
      <button className = "addToBag">
      ADD TO BAG +
      </button>
      <button className = "favoriteStar">⭒</button>

    </div>
  )
  } else {
    return null;
  }
}

export default AddToCart;
