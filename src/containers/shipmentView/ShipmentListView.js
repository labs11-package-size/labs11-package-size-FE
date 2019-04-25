import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Redirect, Link } from "react-router-dom";
import ShipmentList from "../../components/shipment/ShipmentList";
import {
  getShipments,
  getShipmentDetail,
  addShipment,
  deleteShipment,
  deletePackage
} from "../../store/actions/shipmentActions";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#bd7280" },
    secondary: { main: "#bd7280" }
  }
});

const styles = {
  mainContainer: {
    marginTop: 45,
    marginBottom: 60
  },
  heading: {
    marginBottom: 40
  }
};

class ShipmentListView extends Component {
  state = {
    previousPage: null,
    previousRowsPerPage: null,
    previousFilter: null,
    modal: false,
    errorMessage: ""
  };

  componentDidUpdate = prevProps => {
    if (
      this.props.addedsuccess &&
      prevProps.addedsuccess !== this.props.addedsuccess
    ) {
      this.setState(
        {
          modal: false,
          previousPage: 0,
          previousRowsPerPage: 10,
          previousFilter: false
        },
        () => this.props.getShipments()
      );
    }
    if (!!this.props.shipmentDetail && prevProps.shipmentDetail !== this.props.shipmentDetail
    ) {
      this.setState({ modal: this.props.shipmentDetail });
    }
    if (!!this.props.error && prevProps.error !== this.props.error) {
      this.setState({
        errorMessage: this.props.error.response.data.message
      });
    }
  };

  componentDidMount() {
    this.props.getShipments();
  }

  openModal = shipmentData => {
    if (shipmentData.tracked) {
      this.props.getShipmentDetail(shipmentData.uuid);
    } else {
      this.setState({ modal: shipmentData });
    }
  };

  closeModal = () => {
    this.setState({ modal: false, errorMessage: "" });
  };

  addShipment = (trackingNumber, uuid) => {
    this.props.addShipment(trackingNumber, uuid);
  };

  deleteShipment = (uuid, currentPage, currentRowsPerPage, currentFilter) => {
    if (currentFilter === false) {
      this.setState(
        {
          previousPage: currentPage,
          previousRowsPerPage: currentRowsPerPage,
          previousFilter: currentFilter
        },
        () => this.props.deleteShipment(uuid.join())
      );
    } else {
      this.setState(
        {
          previousPage: currentPage,
          previousRowsPerPage: currentRowsPerPage,
          previousFilter: currentFilter
        },
        () => this.props.deletePackage(uuid.join())
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainContainer}>
        <Typography
          className={classes.heading}
          gutterBottom
          variant="h5"
          component="h2"
        >
          Shipments
        </Typography>
        {this.props.shipments.length > 0 ? (
          <MuiThemeProvider theme={theme}>
            <ShipmentList
              modalState={!!this.state.modal}
              modal={this.state.modal}
              openModal={this.openModal}
              closeModal={this.closeModal}
              previousPage={this.state.previousPage}
              previousRowsPerPage={this.state.previousRowsPerPage}
              addShipment={this.addShipment}
              deleteShipment={this.deleteShipment}
              shipments={this.props.shipments}
              previousFilter={this.state.previousFilter}
              addingShipment={this.props.adding}
              failureAdding={this.props.failure}
              errorMessage={this.state.errorMessage}
            />
          </MuiThemeProvider>
        ) : (
          <ShipmentList
            modalState={!!this.state.modal}
            modal={this.state.modal}
            openModal={this.openModal}
            closeModal={this.closeModal}
            previousPage={this.state.previousPage}
            previousRowsPerPage={this.state.previousRowsPerPage}
            filter={this.state.filter}
            addShipment={this.addShipment}
            deleteShipment={this.deleteShipment}
            shipments={this.props.shipments}
            addingShipment={this.props.adding}
            failureAdding={this.props.failure}
            errorMessage={this.state.errorMessage}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    shipments: state.shipmentsReducer.shipments,
    shipmentDetail: state.shipmentsReducer.shipmentDetail,
    adding: state.shipmentsReducer.adding,
    failure: state.shipmentsReducer.failure,
    error: state.shipmentsReducer.error,
    addedsuccess: state.shipmentsReducer.addedsuccess
  };
};

export default connect(
  mapStateToProps,
  {
    getShipments,
    getShipmentDetail,
    addShipment,
    deleteShipment,
    deletePackage
  }
)(withStyles(styles)(ShipmentListView));
