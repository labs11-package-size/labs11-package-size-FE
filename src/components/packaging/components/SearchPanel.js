import React from "react";
import SearchProduct from "./SearchProduct";

const SearchPanel = props => {
  return (
    <div className="SearchPanelContainer">
      {props.searchData.map(product => {
        return (
          <SearchProduct
            product={product}
            key={product.uuid}
            selectProduct={props.selectProduct}
          />
        );
      })}
    </div>
  );
};

export default SearchPanel;
