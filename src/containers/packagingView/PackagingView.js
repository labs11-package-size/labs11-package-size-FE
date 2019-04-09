import React, { Component } from "react";
import "./ResetCss.css";
import "./PackagingView.css";
import axios from "axios";
import PackageFactory from "../../components/packaging/PackageFactory";
import Packages from "../../components/packaging/Packages";

const apiurl = "https://scannarserver.herokuapp.com/api";

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

  packItems = () => {
    if (this.state.boxType === "" && this.state.selectedProducts.length > 29) {
      return this.setState({ previewBoxes: [], limitError: true }, () => {
        this.scrollToPackages()})
    }
    if (this.state.boxType === "shipper" && this.state.selectedProducts.length > 50) {
      return this.setState({ previewBoxes: [], limitError: true }, () => {
        this.scrollToPackages()})
    }
    if (this.state.boxType === "mailer" && this.state.selectedProducts.length > 62) {
      return this.setState({ previewBoxes: [], limitError: true }, () => {
        this.scrollToPackages()})
    }
    this.setState({ limitError: false } , () => {
    this.setState({ addedPackages: [], addedAll: false }, () => {
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
        })
    })})
  };

  scrollToPackages = () => {
    if (window.innerWidth <= 900) {
      window.scroll({
        top: 1050,
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
    if (this.state.selectedProducts.length < 62) {
    this.setState(currentState => ({
      selectedProducts: currentState.selectedProducts.concat(uuid)
    }))
  }
  };

  deleteSelectedProduct = index => {
    const deletionResult = this.state.selectedProducts.slice();
    deletionResult.splice(index, 1);
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
    const allPackagesAdded = this.state.previewBoxes.map((previewbox, index) => {
      return index
    })
    axios
      .post(`${apiurl}/packaging/add`, this.state.previewBoxes)
      .then(res => {
        this.setState(currentState => ({ addedAll: true, addedPackages: currentState.addedPackages.concat(allPackagesAdded) }))
      })
      .catch(err => {
        console.log(err);
      });
  };

  savePackage = packageIndex => {
    axios
      .post(`${apiurl}/packaging/add`, this.state.previewBoxes[packageIndex])
      .then(res => {
        this.setState(currentState => ({
          addedPackages: currentState.addedPackages.concat(packageIndex)
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="PackagingView">
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
        <Packages
          previewBoxes={this.state.previewBoxes}
          limitError={this.state.limitError}
          addedPackages={this.state.addedPackages}
          addedAll={this.state.addedAll}
          getModel={this.getModel}
          savePackageArray={this.savePackageArray}
          savePackage={this.savePackage}
        />
      </div>
    );
  }
}

export default PackagingView;
