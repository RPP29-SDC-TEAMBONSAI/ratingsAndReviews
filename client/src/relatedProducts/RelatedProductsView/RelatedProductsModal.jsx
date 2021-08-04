import React from 'react';
import propTypes from 'prop-types';

const RelatedProductsModal = (props) => {
  return (
    <div className={props.modalShow ? 'relatedProductsModal' : 'relatedProductsModalHidden'} >
      <div className='modalOpen'>
        <div className='modalTable'>
        <h1>Comparing</h1>
          <table>
            <tbody>
              <tr>
                <th>Current Product Name</th>
                <th></th>
                <th>Related Product Name</th>
              </tr>
              <tr>
                <td>Current Product value</td>
                <td>Characteristic</td>
                <td>Related Product value</td>
              </tr>
            </tbody>
          </table>
          <button className='closeModal' onClick={(e) => {props.handleCompareItems('close', e)}}>close</button>
        </div>
      </div>
    </div>
  )
}

RelatedProductsModal.propTypes = {
  modalShow: propTypes.boolean,
  handleCompareItems: propTypes.func
};

  export default RelatedProductsModal;