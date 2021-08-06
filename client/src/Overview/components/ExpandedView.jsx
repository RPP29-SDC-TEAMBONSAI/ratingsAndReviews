import React from "react";

const ExpandedView = (props) => {
  let keyTwo = -1;
  return (
    <div className = "expanded-view-div" >
              {props.state.styles[props.OverviewState.styleIndex].photos.map(
              (photo) => {
                keyTwo += 1;
                if (keyTwo == props.OverviewState.mainPhoto) {
                  return (
                    <div >
                      {function() {
                        if (props.OverviewState.mainPhoto > 0) {
                          return (
                            <button className = "expanded-view-left-arrow" onClick = {props.mainImageLeftArrow}>{function() {
                              return '<'
                            }()}</button>
                            )
                        }
                      }()
                    }
                    <img
                      className="expanded-view-main-photo"
                      key={keyTwo}
                      value={keyTwo}
                      src={photo.url}
                      onClick = {props.expandedView}

                    ></img>
                    {function() {
                      if (props.OverviewState.mainPhoto < props.state.styles[props.OverviewState.styleIndex].photos.length -1) {
                        return (
                          <button className = "expanded-view-right-arrow" onClick = {props.mainImageRightArrow}>></button>
                          )
                      }
                    }()}
                    </div>
                  );
                }
              }
            )
          }
    </div>
  )


}

export default ExpandedView;