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
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function getModalStyle(tracked) {
  const top = 50;
  const left = 50;
  if (!!tracked) {
    return {
      width: "1000px",
      height: "800px",
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
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  TrackedShipmentDetailContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  TrackedShipmentLeftData: {
    width: "30%",
    textAlign: "center",
    height: "675px"
},
  TrackedShipmentAccordianContainer: {
    width: "70%"
  },
  TrackedShipmentLeftDataText: {
    marginTop: "10px"
  },
  productNameList: {
    padding: 0,
  },
  ActivityLocation: {

  },
  ActivityTimeStamp: {

  }
});

class ViewShipmentModal extends React.Component {
  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={!!this.props.modalState}
          onClose={this.props.closeModal}
        >
          <div
            style={getModalStyle(this.props.shipment.tracked)}
            className={classes.paper}
          >
            {!this.props.shipment.tracked ? (
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
                <EmbeddedModel source={this.props.shipment.modelURL} />
                {!!this.props.addingShipment ? (
                  <div>
                    <LoadingSpinner />
                  </div>
                ) : (
                  <form
                    onSubmit={e =>
                      this.props.submitTracking(e, this.props.shipment.uuid)
                    }
                    className={classes.trackForm}
                    autocomplete="off"
                  >
                    <TextField
                      className={classes.trackInput}
                      placeholder="Enter USPS Tracking Number..."
                      name="trackingNumber"
                      value={this.props.trackingNumber}
                      onChange={this.props.handleChanges}
                    />
                    <Button type="submit" className={classes.trackButton}>
                      Track it!
                    </Button>
                  </form>
                )}
                {!!this.props.errorMessage && (
                  <Typography className={classes.failureWarning}>
                    {this.props.errorMessage}
                  </Typography>
                )}
                <div>
                  <Button
                    className={classes.backButton}
                    onClick={this.props.closeModal}
                  >
                    Go Back to List
                  </Button>
                </div>
              </div>
            ) : (
              <div className={classes.TrackedShipmentDetailContainer}>
              <div
                className={classes.TrackedShipmentLeftData}
              >
                <Typography variant="h5" id="modal-title">
                  Detailed Shipment Menu
                </Typography>
                <Typography variant="h6" id="modal-title" className={classes.TrackedShipmentLeftDataText}>
                For package sent to {this.props.shipment.shippedTo}
                </Typography>
                <Typography variant="h5" id="modal-title" className={classes.TrackedShipmentLeftDataText}>
                  Contained Items
                </Typography>
                <ul className={classes.productNameList}>
                {this.props.shipment.productNames.split(",").map(productName => {
                  return <li>{productName}</li>
                })}
                </ul>
                <Typography variant="h5" id="modal-title" className={classes.TrackedShipmentLeftDataText}>
                Tracking Number
                </Typography>
                <Typography variant="h6" id="modal-title" className={classes.TrackedShipmentLeftDataText}>
                   {this.props.shipment.trackingNumber}
                </Typography>
                <Typography variant="h5" id="modal-title" className={classes.TrackedShipmentLeftDataText}>
                Shipping Service
                </Typography>
                <Typography variant="h6" id="modal-title" className={classes.TrackedShipmentLeftDataText}>
                  {this.props.shipment.shippingType}
                </Typography>
                <Typography variant="h5" id="modal-title" className={classes.TrackedShipmentLeftDataText}>
                Box Dimensions
                </Typography>
                <Typography variant="h6" id="modal-title" className={classes.TrackedShipmentLeftDataText}>
                {this.props.shipment.dimensions}
                </Typography>
                <Typography variant="h5" id="modal-title" className={classes.TrackedShipmentLeftDataText}>
                Total Item Weight
                </Typography>
                <Typography variant="h6" id="modal-title" className={classes.TrackedShipmentLeftDataText}>
                {this.props.shipment.totalWeight}
                </Typography>
                </div>
                <div className={classes.TrackedShipmentAccordianContainer}>
        {this.props.shipment.shippingData.activities.map((shippingActivity, index, array) => {
          let eventNumber = (array.length - index)
          let panelNumber = (index + 1)
          let panelString = `panel${panelNumber}`
          return <ExpansionPanel expanded={expanded === panelString} onChange={this.handleChange(panelString)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Event{eventNumber}</Typography>
            <Typography className={classes.secondaryHeading}>{shippingActivity.details}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className={classes.ActivityTimestamp}>
              {shippingActivity.timestamp}
            </Typography>
            <Typography className={classes.ActivityLocation}>
              {shippingActivity.location}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        })}
      </div>
      <div>
                  <Button
                    className={classes.backButton}
                    onClick={this.props.closeModal}
                  >
                    Go Back to List
                  </Button>
                </div>
      </div>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

ViewShipmentModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewShipmentModal);
