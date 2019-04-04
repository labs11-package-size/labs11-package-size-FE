import React, { Component } from "react";
import "./ResetCss.css";
import "./PackagingView.css";
import axios from "axios";
import PackageFactory from "../../components/packaging/components/PackageFactory";
import Packages from "../../components/packaging/components/Packages";

const apiurl = "http://localhost:5000/api";

class PackagingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedProducts: [],
      searchInput: "",
      searchData: [],
      previewBoxes: [],
      boxType: ""
    };
  }

  componentDidMount = () => {
    axios
      .post(`${apiurl}/users/login`, { uid: "q1lHIM09fnWMAxZ6t116rkaS92E2" })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        axios
          .get(`${apiurl}/products`)
          .then(res => {
            this.setState(currentState => ({
              data: currentState.data.concat(res.data)
            }));
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  clearItems = () => {
    this.setState({ selectedProducts: [] });
  };

  packItems = boxType => {
    axios
      .post(`${apiurl}/packaging/preview`, {
        products: this.state.selectedProducts,
        boxType
      })
      .then(res => {
        this.setState({ previewBoxes: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSearch = () => {
    if (!this.state.searchInput) {
      return this.setState({ searchData: [] });
    }
    this.setState({
      searchData: this.state.data
        .filter(products => {
          console.log(this.state.searchInput);
          return (
            products.name
              .toLowerCase()
              .indexOf(this.state.searchInput.toLowerCase()) !== -1
          );
        })
        .slice(0, 10)
    });
  };

  handleChanges = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangesSearch = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.handleSearch();
    });
  };

  selectProduct = id => {
    this.setState(currentState => ({
      selectedProducts: currentState.selectedProducts.concat(id)
    }));
  };

  render() {
    return (
      <div className="PackageFactoryView">
        <PackageFactory
          allData={this.state.data}
          handleSearch={this.handleSearch}
          searchInput={this.state.searchInput}
          searchData={this.state.searchData}
          handleChangesSearch={this.handleChangesSearch}
          selectedProducts={this.state.selectedProducts}
          selectProduct={this.selectProduct}
          clearItems={this.clearItems}
          packItems={this.packItems}
          handleChanges={this.handleChanges}
          boxType={this.state.boxType}
        />
        {this.state.previewBoxes.length ? (
          <p className="SuggestedPackagesTitle">Suggested Packages Preview</p>
        ) : (<div className="ItemLimitsContainer"><p>Limits for Packaging Items</p>
        <div className="ItemLimit">
        <h5>Mailer</h5>
        <p>62 items</p>
          </div>  
        <div className="ItemLimit">
        <h5>Shipper</h5>
        <p>50 Items</p>
        </div>
        <div className="ItemLimit">
        <h5>Not Specified (Either)</h5>
        <p>29 Items</p></div></div>)}
        <Packages previewBoxes={this.state.previewBoxes} />
      </div>
    );
  }
}

export default PackagingView;
