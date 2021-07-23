import React from 'react';

const StyleSelector = (props) => {
  if (props.state.styles.length > 0) {
    let key = 0;

  return (
    <div className = "styleSelector">
      <p>STYLE > {props.state.styles[props.OverviewState.styleIndex].name}</p>
      <table>
        <tbody>
        <tr>
           {props.state.styles.map((style)=> {
             key += 1;
          return (
            <td key = {key}>
            <img src={style.photos[0].thumbnail_url} width="50" height="50"></img>
            </td>
            )
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