import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Redirect, Link } from "react-router-dom";
import ShipmentList from "../../components/shipment/ShipmentList";
import {
  getShipments,
  addShipment,
  deleteShipment,
  deletePackage
} from "../../store/actions/shipmentActions";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#72bda2" },
    secondary: { main: "#72bda2" }
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
    filter: null,
    filteredList: []
  };

  componentDidMount() {
    this.props.getShipments();
  }

  addShipment = (tracId, prodId, event) => {
    event.stopPropagation();
    this.props.addShipment(tracId, prodId);
    return <Redirect to="/" />;
  };

  deleteShipment = (uuid, currentPage, currentRowsPerPage, filter) => {
    if (filter === false) {
      this.setState(
        { previousPage: currentPage, previousRowsPerPage: currentRowsPerPage },
        () => this.props.deleteShipment(uuid.join())
      );
      return <Redirect to="/" />;
    } else {
      this.setState(
        { previousPage: currentPage, previousRowsPerPage: currentRowsPerPage },
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
              previousPage={this.state.previousPage}
              previousRowsPerPage={this.state.previousRowsPerPage}
              addShipment={this.addShipment}
              deleteShipment={this.deleteShipment}
              shipments={this.props.shipments}
            />
          </MuiThemeProvider>
        ) : (
          <MuiThemeProvider theme={theme}>
            <ShipmentList
              previousPage={this.state.previousPage}
              previousRowsPerPage={this.state.previousRowsPerPage}
              addShipment={this.addShipment}
              deleteShipment={this.deleteShipment}
              shipments={this.props.shipments}
            />
          </MuiThemeProvider>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    shipments: state.shipmentsReducer.shipments
  };
};

export default connect(
  mapStateToProps,
  { getShipments, addShipment, deleteShipment, deletePackage }
)(withStyles(styles)(ShipmentListView));
