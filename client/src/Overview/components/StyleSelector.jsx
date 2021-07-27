import React from 'react';

const StyleSelector = (props) => {
  if (props.state.styles.length > 0) {
    let keyOne = -1;
    let keyTwo = -1;

  return (
    <div className = "style-selector">
      <p>STYLE > {props.state.styles[props.OverviewState.styleIndex].name}</p>
      <table>
        <tbody>
        <tr>
           {props.state.styles.map((style)=> {
             keyOne += 1;
             if (keyOne >= 4) {
               return;
             } else {
               return (
                 <td key = {keyOne} onClick = {props.changeStyle}>
            <img value = {keyOne} src={style.photos[0].thumbnail_url} className = "style-selector-image"></img>
            </td>
            )
          }
        })
       }
      </tr>
      <tr>
           {props.state.styles.map((style)=> {
             keyTwo += 1;
             if (keyTwo < 4) {
               return;
             } else {
               return (
            <td key = {keyTwo} onClick = {props.changeStyle}>
            <img value = {keyTwo} src={style.photos[0].thumbnail_url} className = "style-selector-image"></img>
            </td>
            )
          }
        })
       }
      </tr>
      </tbody>
      </table>

    </div>
  )
} else {
  return null;
}
};


export default StyleSelector;