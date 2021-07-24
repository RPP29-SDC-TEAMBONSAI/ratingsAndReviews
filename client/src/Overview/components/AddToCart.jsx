import React from "react";

const AddToCart = (props) => {
  if (props.state.styles.length > 0) {
    let val = 0;
    return (
      <div>
        <select className="selectSize" onChange={props.changeAvailableQuantity}>
          <option id = "selectSize">SELECT SIZE</option>
          {Object.entries(
            props.state.styles[props.OverviewState.styleIndex].skus
          ).map(([key, value]) => {
            if (value.quantity > 0) {
              val += 1;
              return (
                <option key={val} value={value.quantity + ' ' + value.size}>
                  {value.size}
                </option>
              );
            }
          })}
        </select>
        <select className="quantity" onChange = {props.changeSelectedQuantity}>
          {(function () {
            let jsxElements = [];
            if (props.OverviewState.quantityAvailable > 0) {
              if (props.OverviewState.quantityAvailable > 15) {
                for (let i = 1; i <= 15; i++) {
                  jsxElements.push(<option key={i}>{i}</option>);
                }
              } else {
                for (let i = 1; i <= props.OverviewState.quantityAvailable; i++) {
                  jsxElements.push(<option key={i}>{i}</option>);
                }
              }
              return jsxElements;
            } else {
              return <option>-</option>;
            }
          })()}
        </select>
        <button className="addToBag" onClick = {props.addToBag}>ADD TO BAG +</button>
        <button className="favoriteStar">⭒</button>
      </div>
    );
  } else {
    return null;
  }
};

export default AddToCart;
