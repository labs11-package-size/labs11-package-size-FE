import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";
import EmbeddedModel from "./EmbeddedModel";
import TextField from "@material-ui/core/TextField";
import LoadingSpinner from "../loadingSpinner/LoadingSpinnerAddShipment";

function getModalStyle(tracked) {
  const top = 50;
  const left = 50;
  if (!!tracked) {
    return {
      padding: "30px",
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }
  return {
    width: "700px",
    height: "800px",
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    outline: "none",
    backgroundColor: theme.palette.background.paper
  },
  backButton: {
    width: "500px",
    color: "white",
    backgroundColor: "#bd7280",
    marginTop: "25px",
    "&:hover": {
      color: "black"
    }
  },
  trackInput: {
    width: "350px"
  },
  trackButton: {
    marginLeft: "50px",
    width: "100px",
    color: "white",
    backgroundColor: "#bd7280",
    "&:hover": {
      color: "black"
    }
  },
  trackForm: {
    marginTop: "25px"
  },
  failureWarning: { 
    position: "absolute", 
    top: "647px", 
    padding: "0 5px",
    backgroundColor: "#bd7280",
    color: "white",
    borderRadius: "20px"
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
        <div
          style={getModalStyle(props.shipment.tracked)}
          className={classes.paper}
        >
          {!props.shipment.tracked ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <Typography variant="h5" style={{ margin: "20px 0" }}>
                  Suggested Packaging Orientation
                </Typography>
                <EmbeddedModel source={props.shipment.modelURL} />              
                {!!props.addingShipment ? (<div><LoadingSpinner /></div>) : (<form
                  onSubmit={e => props.submitTracking(e, props.shipment.uuid)}
                  className={classes.trackForm}
                  autocomplete="off"
                >
                  <TextField
                    className={classes.trackInput}
                    placeholder="Enter USPS Tracking Number..."
                    name="trackingNumber"
                    value={props.trackingNumber}
                    onChange={props.handleChanges}
                  />
                  <Button type="submit" className={classes.trackButton}>
                    Track it!
                  </Button>
                </form>)}
                {!!props.errorMessage && (
                  <Typography
                    className={classes.failureWarning}
                  >
                    {props.errorMessage}
                  </Typography>
                )}
                <div>
                  <Button
                    className={classes.backButton}
                    onClick={props.closeModal}
                  >
                    Go Back to List
                  </Button>
                </div>
              </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <Typography variant="h6" id="modal-title">
                Shipment Info for package to {props.shipment.shippedTo}
              </Typography>
              <Typography variant="h6" id="modal-title">
                Contains: {props.shipment.productNames}
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
                <Button
                  className={classes.backButton}
                  onClick={props.closeModal}
                >
                  Go Back to List
                </Button>
                {props.children}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

ViewShipmentModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewShipmentModal);
