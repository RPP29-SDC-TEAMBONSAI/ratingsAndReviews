import React from "react";

const ImageGallery = (props) => {
  if (props.state.styles.length > 0) {
    let keyOne = -1;
    let keyTwo = -1;

    return (
      <div className="image-gallery">
        <div className="image-sidebar">
          {props.state.styles[props.OverviewState.styleIndex].photos.map(
            (photo) => {
              keyOne += 1;
              return (
                <img
                  className="gallery-image"
                  key={keyOne}
                  value={keyOne}
                  src={photo.url}
                  onClick={props.changeMainPhoto}
                ></img>
              );
            }
          )}
        </div>
        <div>
          {props.state.styles[props.OverviewState.styleIndex].photos.map(
              (photo) => {
                keyTwo += 1;
                if (keyTwo == props.OverviewState.mainPhoto) {
                  return (
                    <img
                      className="main-photo"
                      key={keyTwo}
                      value={keyTwo}
                      src={photo.url}
                      onClick={props.changeMainPhoto}
                    ></img>
                  );
                }
              }
            )
          }
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ImageGallery;
