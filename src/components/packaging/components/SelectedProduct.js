import React from "react";

const SelectedProduct = props => {
  return (
    <div className="SelectedProductContainer">
      <p className="SelectedProductContainerName">{props.product.name}</p>
      <p className="SelectedProductContainerSize">
        {" "}
        Size: {props.product.length}x{props.product.width}x
        {props.product.height}
      </p>
    </div>
  );
};

export default SelectedProduct;
