import React from "react";

const SearchProduct = props => {
  return (
    <div className="SearchProductContainer">
      <div className="ProductInfo">
        <h5 className="ProductName">{props.product.name}</h5>
        <p className="ProductDimensions">
          Size: {props.product.length}x{props.product.width}x
          {props.product.height}
        </p>
      </div>

      <button
        className="ProductButton"
        onClick={() => props.selectProduct(props.product.identifier)}
      >
        Add
      </button>
    </div>
  );
};

export default SearchProduct;
