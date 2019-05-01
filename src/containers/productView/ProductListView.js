import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import AddProductModal from "../../components/modals/AddProductModal";
import ImgUploader from "../../components/imgUploader/ImgUploader";

import { Redirect, withRouter } from "react-router-dom";

import ProductList from "../../components/product/ProductList";
import {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
  getDetail
} from "../../store/actions/productActions";
import {
  addShipment,
  selectProduct,
  addPackage
} from "../../store/actions/shipmentActions";
import { compose } from "redux";
import { css } from "popmotion";

const styles = theme => ({
  mainContainer: {
    marginTop: 30,
    maxWidth: "auto"
  },
  container: {
    marginBottom: 60,
    flexDirection: "column",
    display: "flex"
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  heading: {
    padding: 10
  },
  modalStyle: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  }
});

class ProductListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {
        name: "",
        productDescription: "",
        weight: "",
        length: "",
        width: "",
        height: "",
        value: "",
        images: [],
        thumbnail: ""
        // 	this.props.images.length >= 1 && this.props.images[0].secure_url,
      },
      trackingNumber: "",
      searchTerm: "",
      SelectedProduct: []
    };
  }

  componentWillMount = () => {
    this.props.getProducts();
  };

  componentDidUpdate = prevProps => {
    if (!!this.props.images.length && prevProps.images !== this.props.images) {
	  let imageslist = this.state.product.images.slice();
	  imageslist.push(this.props.images[0].secure_url)
      this.setState({ product: {...this.state.product, images: imageslist} }, () =>
        this.setState({ product: {...this.state.product, thumbnail: imageslist[0]} })
      );
    }
  };

  handleSelectProduct = (product, event) => {
    event.stopPropagation();
    this.props.selectProduct(product);
  };

  updateSearch = e => {
    this.setState({ searchTerm: e.target.value });
  };

  filteredProducts = () => {
    return this.props.products.filter(product => {
      return (
        product.name
          .toLowerCase()
          .indexOf(this.state.searchTerm.toLowerCase()) !== -1
      );
    });
  };

  productAdd = prod => {
    console.log("product ADDING", this.state.product);
    this.props.addProduct(prod);
    this.setState({
      product: {
        name: "",
        productDescription: "",
        weight: "",
        length: "",
        width: "",
        height: "",
        value: "",
        thumbnail: "",
        images: []
      }
    });
  };

  addShipment = (tracId, prod) => {
    this.props.addShipment(tracId, prod);
    this.setState({
      trackingNumber: ""
    });
    this.props.history.push("/");
  };

  deleteProduct = id => {
    this.props.deleteProduct(id);
    return <Redirect to="/products" />;
  };
  // componentWillUpdate = prevProps => {
  // 	if (this.props.images.length >= 1 && prevProps.images.length >= 1) {
  // 		this.setState({
  // 			product: {
  // 				...this.state.product,
  // 				images: this.props.images,
  // 				thumbnail:
  // 					this.props.images.length >= 1 && this.props.images[0].secure_url,
  // 			},
  // 		});
  // 	}
  // };

  editProduct = (id, prod) => {
    this.props.editProduct(id, prod);
    this.setState({
      product: {
        name: "",
        productDescription: "",
        weight: "",
        length: "",
        width: "",
        height: "",
        value: ""
      },
      thumbnail: "",
      images: []
    });
    this.props.history.push("/");
  };

  deleteImg = imgId => {
    let updatedImages = Object.assign([], this.state.images);
    updatedImages.splice(imgId, 1);

    this.setState({
      product: {
        images: updatedImages
      }
    });
  };

  handleInputChange = event => {
    this.setState({
      product: {
        ...this.state.product,
        [event.target.name]: event.target.value
      }
    });
  };
  updateState = product => {
    this.setState({ product: { ...this.state.product, product } });
  };

  render() {
    return (
      <div className={this.props.classes.mainContainer}>
        <div>
          <ProductList
            selectedProducts={this.props.selectedProducts}
            updateState={this.updateState}
            selectProduct={this.handleSelectProduct}
            loadMore={this.props.getProducts}
            deleteImg={this.deleteImg}
            editProduct={this.editProduct}
            deleteProduct={this.deleteProduct}
            addShipment={this.addShipment}
            products={
              this.state.searchTerm
                ? this.filteredProducts()
                : this.props.products
            }
            handleChange={this.handleInputChange}
            trackingNumber={this.state.trackingNumber}
            name={this.state.product.name}
            productDescription={this.state.product.productDescription}
            weight={this.state.product.weight}
            length={this.state.product.length}
            width={this.state.product.width}
            height={this.state.product.height}
            value={this.state.product.value}
            product={this.state.product}
            addProduct={this.productAdd}
            searchTerm={this.state.searchTerm}
            updateSearch={this.updateSearch}
            addPackage={this.props.addPackage}
            getDetail={this.props.getDetail}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedProducts: state.shipmentsReducer.selectedProducts,
    products: state.productsReducer.products,
    thumbnail: state.productsReducer.thumbnail,
    images: state.productsReducer.images
  };
};

export default compose(
  withRouter(
    connect(
      mapStateToProps,
      {
        getProducts,
        addProduct,
        editProduct,
        deleteProduct,
        addShipment,
        selectProduct,
        addPackage,
        getDetail
      }
    )(withStyles(styles)(ProductListView))
  )
);
