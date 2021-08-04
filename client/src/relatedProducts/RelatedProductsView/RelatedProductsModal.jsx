import React from 'react';
import propTypes from 'prop-types';

const RelatedProductsModal = (props) => {
  return (
    <div className={props.modalShow ? 'relatedProductsModal' : 'relatedProductsModalHidden'}>
      <h1>Comparing</h1>
      <table>
        <thead>
          <trow>
            <th>Current Product Name</th>
            <th>                    </th>
            <th>Related Product Name</th>
          </trow>
        </thead>
        <tbody>
          <trow>
            <td>Current Product value</td>
            <td>Characteristic</td>
            <td>Related Product value</td>
          </trow>
        </tbody>
      </table>
    </div>
  )
}

RelatedProductsModal.propTypes = {
  modalShow: propTypes.boolean
};

  export default RelatedProductsModal;