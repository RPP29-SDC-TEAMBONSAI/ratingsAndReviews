import React from 'react';

const ImageGallery = (props) => {
  if (props.state.styles.length > 0) {
    let key = 0;


  return (
    <div>
      <p>ImageGallery</p>
      {props.state.styles[props.OverviewState.styleIndex].photos.map((photo) =>{
        key += 1;
        return (
          <img key = {key} src={photo.url} width="200" height="200"></img>
          )
      }

      )}
    </div>
  )
  } else {
    return null;
  }
};

export default ImageGallery;
