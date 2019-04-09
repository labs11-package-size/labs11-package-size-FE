import React from "react";

const SearchProduct = props => {
  return (
    <button className="SearchProductContainer" onClick={() => props.selectProduct(props.product.uuid)}>
        <h5 className="ProductName">{props.product.name}</h5>
        <p className="ProductDimensions">
          Size: {props.product.length}"x{props.product.width}"x
          {props.product.height}"
        </p>
    </button>
  );
};

export default SearchProduct;