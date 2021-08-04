import React from 'react';
import propTypes from 'prop-types';

const RelatedProductsModal = (props) => {
  console.log(props.clickedProductInfo.features)
  console.log(props.currentProdInfo.features)
  let combinedFeatures = [];
  if (props.clickedProductInfo.features) {
    props.clickedProductInfo.features.forEach(feature => {
      let featureObj = {};
      featureObj[feature.feature] = [feature.value, props.clickedProductInfo.id]
      combinedFeatures.push(featureObj);
    })
  }

    props.currentProdInfo.features.forEach(feature => {

      combinedFeatures.map(existingFeature => {
        if (Object.keys(existingFeature)[0] === feature.feature) {
          existingFeature[feature.feature] = [[...existingFeature[feature.feature]],[feature.value, props.currentProdInfo.id]];
        }
      })

    })
  console.log(JSON.stringify(combinedFeatures))



  return (
    <div className={props.modalShow ? 'relatedProductsModal' : 'relatedProductsModalHidden'} >
      <div className='modalOpen'>
        <div className='modalTable'>
        <h1>Comparing</h1>
          <table>
            <tbody>
              <tr>
                <th>{props.currentProdInfo.name}</th>
                <th></th>
                <th>{props.clickedProductInfo.name}</th>
              </tr>

              <tr>
                <td>Current Product value</td>
                <td>Characteristic</td>
                <td>Related Product value</td>
              </tr>
            </tbody>
          </table>
          <button className='closeModal' onClick={(e) => {props.handleCompareItems('🐮', e)}}>close</button>
        </div>
      </div>
    </div>
  )
};
/*
what I need:
product info for current product- maybe available via app state
product info for clicked product- available in allProps, but have to figure
out how to get the specific data for the clicked product

*/

RelatedProductsModal.propTypes = {
  modalShow: propTypes.any,
  handleCompareItems: propTypes.func,
  allProps: propTypes.object,
  currentProdInfo: propTypes.object,
  clickedProductInfo: propTypes.object
};

  export default RelatedProductsModal;