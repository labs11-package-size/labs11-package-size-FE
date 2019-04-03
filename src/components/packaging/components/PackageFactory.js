import React from "react"
import SearchPanel from "./SearchPanel"
import SelectedProductsPanel from "./SelectedProductsPanel"

const PackageFactory = props => {
    return (
        <div className="PackageFactoryContainer">
        <div className="SearchContainer">
        <p>Enter product names, and then select the products you'd like to package.</p>
            <input
            className="SearchBar"
            value={props.searchInput}
            type="text"
            name="searchInput"
            placeholder="Search for Products to Package..."
            onChange={props.handleChanges}
            />
            <SearchPanel searchData={props.searchData} selectProduct={props.selectProduct} />
        </div>
            <SelectedProductsPanel clearItems={props.clearItems} packItems={props.packItems} allData={props.allData} selectedProducts={props.selectedProducts}/>
        </div>
    )
}

export default PackageFactory