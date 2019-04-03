import React from "react";
import SelectedProduct from "./SelectedProduct.js";

const SelectedProductsPanel = props => {
  return (
    <div className="SelectedProductsPanelContainer">
      <div className="SelectedProductsTitle">
        <p> Selected Products</p>
        <button
          className="SelectedProductsTitleButton"
          onClick={props.packItems}
        >
          Pack Items
        </button>
        <button
          className="SelectedProductsTitleButton"
          onClick={props.clearItems}
        >
          Clear Items
        </button>
      </div>
      <div className="InnerSelectedProductsPanel">
        {props.selectedProducts.map(productId => {
          const foundProduct = props.allData.find(product => {
            return product.identifier === productId;
          });
          return <SelectedProduct product={foundProduct} />;
        })}
      </div>
    </div>
  );
};

export default SelectedProductsPanel;
