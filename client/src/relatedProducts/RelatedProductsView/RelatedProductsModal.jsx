import React from 'react';
import propTypes from 'prop-types';


const RelatedProductsModal = (props) => {

  return (
    <div className='relatedProductsModal'
         style={{'display': props.modalShow ? 'flex' : 'none'}} >
      <div className='modalOpen'>
        <div className='modalTable'>
          <h1>Comparing</h1>
          <table>
            <tbody>
              <tr>
                <th>{props.modifiedCurrent.name}</th>
                <th>Feature</th>
                <th>{props.clickedProductInfo.name}</th>
                </tr>
           {props.features.length > 0 ?
            props.features.map((feature, i) => {

            return (

              <React.Fragment key={i++} >
                <tr>
                  <td>
                    {
                    props.modifiedCurrent.features[feature] !== undefined ?
                      props.modifiedCurrent.features[feature] :
                      'n/a'
                    }
                  </td>
                  <td>{feature}</td>
                  <td>
                  {
                    props.clickedProductInfo.features[feature] !== undefined ?
                      props.clickedProductInfo.features[feature] :
                      'n/a'
                    }
                  </td>
                </tr>

              </React.Fragment>
            )
            }) : <div>Loading</div>}
              </tbody>
            </table>
          <button className='closeModal' onClick={(e) => {props.closeModal(e)}}>close</button>
        </div>
      </div>
    </div>
  )
};


RelatedProductsModal.propTypes = {
  modalShow: propTypes.any,
  handleCompareItems: propTypes.func,
  clickedProductInfo: propTypes.object,
  features: propTypes.array,
  closeModal: propTypes.func,
  modifiedCurrent: propTypes.object
};

  export default RelatedProductsModal;

