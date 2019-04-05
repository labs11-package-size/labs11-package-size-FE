import React from "react";
import SelectedProduct from "./SelectedProduct.js";

const SelectedProductsPanel = props => {
  return (
    <div className="SelectedProductsPanelContainer">
      <div className="SelectedProductsTitle">
          <p>Box Type:</p>
        <div className="BoxTypeSelectorContainer">
          <div>
          <input className="BoxTypeSelector" type="radio" id="mailer" name="boxType" value="mailer" onChange={props.handleChanges} checked={props.boxType === 'mailer'}/>
          <label for="mailer">Mailer</label>
          </div>
          <div>
          <input className="BoxTypeSelector" type="radio" id="shipper" name="boxType" value="shipper" onChange={props.handleChanges} checked={props.boxType === 'shipper'}/>
          <label for="shipper">Shipper</label>
          </div>
          <div>
          <input className="BoxTypeSelector" type="radio" id="either" name="boxType" value="" onChange={props.handleChanges} checked={props.boxType === ''}/>
          <label for="either">Not Specified</label>
          </div>
        </div>
        <button
          className="SelectedProductsTitleButton"
          onClick={() => props.packItems()}
        >
          Pack Items
        </button>
        <button
          className="SelectedProductsTitleButton"
          onClick={() => props.clearItems()}
        >
          Clear Items
        </button>
      </div>
      <p>Selected Products - Click a Product to Remove</p>
      <div className="InnerSelectedProductsPanel">
        {props.selectedProducts.map((uuid, index) => {
          const foundProduct = props.allData.find(product => {
            return product.uuid === uuid;
          });
          return <SelectedProduct product={foundProduct} selectedProductIndex={index} deleteSelectedProduct={props.deleteSelectedProduct}/>;
        })}
      </div>
    </div>
  );
};

export default SelectedProductsPanel;
