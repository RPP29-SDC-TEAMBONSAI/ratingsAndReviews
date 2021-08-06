import React from 'react';
import propTypes from 'prop-types';


const RelatedProductsModal = (props) => {
  console.log(props.features)
  return (
    <div className='relatedProductsModal'
         style={{'display': props.modalShow ? 'flex' : 'none'}} >
      <div className='modalOpen'>
        <div className='modalTable'>
          <h1>Comparing</h1>

           {/* {console.log(props.features)} */}
           {props.features.length > 0 ?
        props.features.map((feature, i) => {
          console.log(feature)
                return (
                  <div key={`feature-${i}`}>
                    Rendered
                  </div>
                )
              }) : <div>Loading</div>}
          <button className='closeModal' onClick={(e) => {props.closeModal(e)}}>close</button>
        </div>
      </div>
    </div>
  )
};


RelatedProductsModal.propTypes = {
  modalShow: propTypes.any,
  handleCompareItems: propTypes.func,
  allProps: propTypes.object,
  currentProductInfo: propTypes.object,
  clickedProductInfo: propTypes.object,
  features: propTypes.array,
  closeModal: propTypes.func
};

  export default RelatedProductsModal;

{/* {console.log('incode features', props.features)}
        {props.features.length > 0 ?
        props.features.map((feature, i) => {
          console.log(feature)
                return (
                  <div key={`feature-${i}`}>
                    Rendered
                  </div>
                )
              }) : <div>Loading</div>} */}