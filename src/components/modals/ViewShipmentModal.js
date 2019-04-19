import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 60,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});

const ViewShipmentModal = props => {
  const { classes } = props;

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={!!props.modalState}
        onClose={props.closeModal}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <Typography variant="h6" id="modal-title">
            Shipment Info for package to {props.shipment.shippedTo}
          </Typography>
          <Typography variant="h6" id="modal-title">
            Contains: {props.shipment.productNames.join(", ")}
          </Typography>
          <Typography variant="h6" id="modal-title">
            Tracking Number: {props.shipment.trackingNumber}
          </Typography>
          <Typography variant="h6" id="modal-title">
            {props.shipment.shippingType}
          </Typography>
          <Typography variant="h6" id="modal-title">
            Box Dimensions: {props.shipment.dimensions}
          </Typography>
          <Typography variant="h6" id="modal-title">
            Total Item Weight:{props.shipment.totalWeight}
          </Typography>
          <div>
            <Button onClick={props.closeModal}>Go Back to List</Button>
            {props.children}
          </div>
        </div>
      </Modal>
    </div>
  );
};

ViewShipmentModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewShipmentModal);
