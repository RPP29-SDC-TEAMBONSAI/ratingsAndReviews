import React from 'react';

const StyleSelector = (props) => {
  if (props.state.styles.length > 0) {
    let i = 0;

  return (
    <div className = "styleSelector">
      <p>STYLE > selected style</p>
      <table>
        <tbody>
        <tr>
           {props.state.styles[2].photos.map((photo)=> {
          return (
            <td>
            <img src={photo.thumbnail_url} width="50" height="50"></img>
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