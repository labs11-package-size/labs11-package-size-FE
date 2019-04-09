import React from "react";

const SelectedProduct = props => {
  return (
    <div className="SelectedProductContainer" onClick={() => props.deleteSelectedProduct(props.selectedProductIndex)}>
      <p className="SelectedProductContainerName">#{props.product.identifier}{" "}{props.product.name}</p>
      <p className="SelectedProductContainerSize">
        Size: {props.product.length}x{props.product.width}x
        {props.product.height}
      </p>
    </div>
  );
};

export default SelectedProduct;
