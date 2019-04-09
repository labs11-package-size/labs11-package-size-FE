import React from "react";
import SearchPanel from "./SearchPanel";
import SelectedProductsPanel from "./SelectedProductsPanel";

const PackageFactory = props => {
  return (
    <div className="PackageFactoryContainer">
      <div className="SearchContainer">
        <p>
          Enter product names, and then click on the products you'd like to
          package to select them.
        </p>
        <input
          className="SearchBar"
          value={props.searchInput}
          type="text"
          name="searchInput"
          placeholder="Search for Products to Package..."
          onChange={props.handleChangesSearch}
        />
        <SearchPanel
          searchData={props.searchData}
          selectProduct={props.selectProduct}
        />
      </div>
      <SelectedProductsPanel
        deleteSelectedProduct={props.deleteSelectedProduct}
        clearItems={props.clearItems}
        packItems={props.packItems}
        allData={props.allData}
        selectedProducts={props.selectedProducts}
        handleChanges={props.handleChanges}
        boxType={props.boxType}
      />
    </div>
  );
};

export default PackageFactory;
