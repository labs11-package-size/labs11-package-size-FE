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
import moment from "moment-timezone"

const timezone = moment.tz.guess()

const styles = theme => ({
  modal: {

  },
  paper: {
    position: "absolute",
    outline: "none",
    backgroundColor: theme.palette.background.paper,
    width: "1000px",
    height: "800px",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    [theme.breakpoints.down("sm")]: {
      width: "500px"
    }
  },
  paperuntracked: {
    position: "absolute",
    outline: "none",
    backgroundColor: theme.palette.background.paper,
    width: "700px",
    height: "800px",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    [theme.breakpoints.down("sm")]: {
      width: "500px",
      height: "615px"
    }
  },
  backButton: {
    width: "500px",
    color: "white",
    backgroundColor: "#bd7280",
    marginTop: "25px",
    "&:hover": {
      color: "black"
    },
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    }
  },
  trackInput: {
    width: "350px",
    [theme.breakpoints.down("sm")]: {
      width: "230px"
    }
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
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    alignItems: "center",
    height: "650px",
  },
  TrackedShipmentLeftData: {
    width: "30%",
    padding: "15px",
    backgrounColor: "#ECEFF3",
    border: "1px solid black",
    borderRadius: "15px",
    [theme.breakpoints.down("sm")]: {
      width: "auto"
    }
},
  TrackedShipmentAccordianContainer: {
    width: "55%",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  TrackedShipmentLeftDataHeader: {
    marginTop: "10px",
    textDecoration: "underline"
  },
  TrackedShipmentLeftDataText: {
    textAlign: "center"
  },
  productNameList: {

  },
  ActivityLocation: {

  },
  ActivityTimeStamp: {

  },
  AccordionPanelOuter: {
    margin: "0"
  },
  AccordionPanelSummary: {
    minHeight: "0"
  },
  summarycontent: {
    margin: "7px 0"
  },
  AccordianDetails: {
    padding: "2px 24px 12px"
  },
  ActivityLocation: {
    fontWeight: "bolder"
  },
  ActivityTimestamp: {
    marginLeft: "7px"
  },
  ModalTitle: {
    width: "100%",
    textAlign: "center",
    margin: "20px 0"
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
            className={classNames({
				[classes.paper]: this.props.shipment.tracked === 1,
        [classes.paperuntracked]: this.props.shipment.tracked === 0
			})}
          >
          <div className={classes.ModalTitle}>
            {!this.props.shipment.tracked ? (<Typography variant="h5" id="modal-title">
                  Suggested Packaging Orientation
                </Typography>) :

              (<Typography className={classes.TrackedTitle} variant="h5" id="modal-title">
                  Detailed Shipment Menu
                </Typography>)
            }
          </div>
          
            {!this.props.shipment.tracked ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
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
              </div>
            ) : (
              <div className={classes.TrackedShipmentDetailContainer}>
              <div
                className={classes.TrackedShipmentLeftData}
              >
                <Typography variant="h5" id="modal-title" className={classes.TrackedShipmentLeftDataTitle}>
                For package sent to: <br/> {this.props.shipment.shippedTo}
                </Typography>
                <Typography variant="h5" id="modal-title" className={classes.TrackedShipmentLeftDataHeader}>
                  Contained Items
                </Typography>
                <ul className={classes.productNameList}>
                {this.props.shipment.productNames.split(",").map(productName => {
                  return <li>{productName}</li>
                })}
                </ul>
                <Typography variant="h5" id="modal-title" className={classes.TrackedShipmentLeftDataHeader}>
                Tracking Number
                </Typography>
                <Typography variant="h6" id="modal-title" className={classes.TrackedShipmentLeftDataText}>
                   {this.props.shipment.trackingNumber}
                </Typography>
                <Typography variant="h5" id="modal-title" className={classes.TrackedShipmentLeftDataHeader}>
                Shipping Service
                </Typography>
                <Typography variant="h6" id="modal-title" className={classes.TrackedShipmentLeftDataText}>
                  {this.props.shipment.shippingType ? (`${this.props.shipment.shippingType}`) : (`Unknown`)}
                </Typography>
                <Typography variant="h5" id="modal-title" className={classes.TrackedShipmentLeftDataHeader}>
                Box Dimensions
                </Typography>
                <Typography variant="h6" id="modal-title" className={classes.TrackedShipmentLeftDataText}>
                {this.props.shipment.dimensions}
                </Typography>
                <Typography variant="h5" id="modal-title" className={classes.TrackedShipmentLeftDataHeader}>
                Total Item Weight
                </Typography>
                <Typography variant="h6" id="modal-title" className={classes.TrackedShipmentLeftDataText}>
                {this.props.shipment.totalWeight}
                </Typography>
                <div style ={{width: "100%", display: "flex", justifyContent: "center"}}>
                  <Button
                    className={classes.backButton}
                    onClick={() => window.open(`${this.props.shipment.modelURL}`, '_blank')}
                  >
                    View Packaging Suggestion Model
                  </Button>
                </div>
                </div>
                <div className={classes.TrackedShipmentAccordianContainer}>
        {this.props.shipment.shippingData.activities.map((shippingActivity, index, array) => {
          let eventNumber = (array.length - index)
          let panelNumber = (index + 1)
          let panelString = `panel${panelNumber}`
          return <ExpansionPanel className={classes.AccordionPanelOuter} expanded={expanded === panelString} onChange={this.handleChange(panelString)}>
          <ExpansionPanelSummary classes={{ content: classes.summarycontent }} className={classes.AccordionPanelSummary} expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Event {eventNumber}</Typography>
            <Typography className={classes.secondaryHeading}>{shippingActivity.details}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.AccordianDetails}>
          <Typography className={classes.ActivityLocation}>
            {shippingActivity.location ? (`${shippingActivity.location}:`) : (`En-route:`)}
             
            </Typography>
            <Typography className={classes.ActivityTimestamp}>
              Item scanned on {moment.tz(shippingActivity.timestamp, "Pacific/Fiji").clone().tz(timezone).format("dddd, MMM Do")} at {moment.tz(shippingActivity.timestamp, "Pacific/Fiji").clone().tz(timezone).format("hh:mm A")}
            </Typography>
            
          </ExpansionPanelDetails>
        </ExpansionPanel>
        })}
      </div>

      </div>
            )}
            <div style ={{width: "100%", display: "flex", justifyContent: "center"}}>
                  <Button
                    className={classes.backButton}
                    onClick={this.props.closeModal}
                  >
                    Go Back to List
                  </Button>
                </div>
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
