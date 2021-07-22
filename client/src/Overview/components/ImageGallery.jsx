import React from 'react';

const ImageGallery = (props) => {
  if (props.state.styles.length > 0) {


  return (
    <div>
      <p>ImageGallery</p>
      {props.state.styles[2].photos.map((photo) =>{
        return (
          <img src={photo.url} width="200" height="200"></img>
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
