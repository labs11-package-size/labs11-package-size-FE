import React, { Component } from "react";
import "./ResetCss.css";
import "./PackagingView.css";
import axios from "axios";
import PackageFactory from "../../components/packaging/components/PackageFactory";
import Packages from "../../components/packaging/components/Packages";

// const apiurl = "https://scannarserver.herokuapp.com/api";
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
      boxType: "",
      limitError: false,
      addedPackages: [],
      duplicatePackages: []
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

  // switch (this.state.boxType) {
  //   case "mailer":
  //   if (this.state.selectedProducts.length > 62) {
  //     return this.setState({ limitError: "mailer "})
  //   }
  // }

  packItems = () => {
    this.setState({ addedPackages: [], duplicatePackages: [] }, () => {
      axios
        .post(`${apiurl}/packaging/preview`, {
          products: this.state.selectedProducts,
          boxType: this.state.boxType
        })
        .then(res => {
          this.setState({ previewBoxes: res.data }, () => {
            this.scrollToPackages();
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  scrollToPackages = () => {
    if (window.innerWidth <= 900) {
      window.scroll({
        top: 850,
        left: 0,
        behavior: "smooth"
      });
    } else {
      window.scroll({
        top: 500,
        left: 0,
        behavior: "smooth"
      });
    }
  };

  handleSearch = () => {
    if (!this.state.searchInput) {
      return this.setState({ searchData: [] });
    }
    this.setState({
      searchData: this.state.data
        .filter(products => {
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

  selectProduct = uuid => {
    this.setState(currentState => ({
      selectedProducts: currentState.selectedProducts.concat(uuid)
    }));
  };

  deleteSelectedProduct = index => {
    const deletionResult = this.state.selectedProducts.slice()
    deletionResult.splice(index, 1)
    this.setState(currentState => ({
      selectedProducts: deletionResult
    }));
  };

  getModel = box => {
    const mapItemsURL = () => {
      return box.items
        .map(item => {
          return `${item.id}:${item.constraints}:${item.weight}:${
            item.size_1
          }x${item.size_2}x${item.size_3}`;
        })
        .join();
    };
    const modelURL = `bins=0:${box.weight_limit}:${box.size_1}x${box.size_2}x${
      box.size_3
    }&items=${mapItemsURL()}&binId=0`;
    window.open(`${apiurl}/packaging/getModel/${modelURL}`, "_blank");
  };

  savePackageArray = () => {
    axios.post(`${apiurl}/packaging/add`, this.state.previewBoxes)
  }

  savePackage = packageIndex => {
    axios.post(`${apiurl}/packaging/add`, this.state.previewBoxes[packageIndex])
  }

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
          deleteSelectedProduct={this.deleteSelectedProduct}
          clearItems={this.clearItems}
          packItems={this.packItems}
          handleChanges={this.handleChanges}
          boxType={this.state.boxType}
        />
        {this.state.limitError && (
          <p className="LimitErrorWarning">
            Your packaging list contains too many items to process the boxes
            preview. Please click some items to remove them from the list, and
            then try again.
          </p>
        )}
        {this.state.previewBoxes.length ? (
          <p className="SuggestedPackagesTitle">Suggested Packages Preview</p>
        ) : (
          <div className="ItemLimitsContainer">
            <p>Limits for Packaging Items</p>
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
              <p>29 Items</p>
            </div>
          </div>
        )}
        <Packages
          previewBoxes={this.state.previewBoxes}
          limitError={this.state.limitError}
          addedPackages={this.state.addedPackages}
          duplicatePackages={this.state.duplicatePackges}
          getModel={this.getModel}
          savePackageArray={this.savePackageArray}
          savePackage={this.savePackage}
        />
      </div>
    );
  }
}

export default PackagingView;
