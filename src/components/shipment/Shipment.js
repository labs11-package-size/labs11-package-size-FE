import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";
import Checkbox from "@material-ui/core/Checkbox";
import ViewShipmentModal from "../modals/ViewShipmentModal";
import moment from "moment";
import { Button } from "@material-ui/core";
import { white } from "ansi-colors";

const styles = theme => ({
  statuscell: {
    width: "100px"
  },
  button: {
    marginLeft: "30px",
    backgroundColor: "#72bda2",
    color: "white",
    fontSize: "10px"
  }
});

function Shipment(props) {
  const { classes } = props;
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={props.isSelected}
            onClick={event => props.handleClick(event, props.shipment.uuid)}
          />
        </TableCell>
        <TableCell align="right">
          {moment(props.shipment.lastUpdated).format("L h:mm a")}
        </TableCell>
        {props.shipment.status ? (
          <TableCell style={statusStyling(props.shipment)} align="right">
            {parsedStatus(props.shipment)}
          </TableCell>
        ) : (
          <TableCell className={classes.statuscell} align="right">
            <Button className={classes.button}>Track</Button>
          </TableCell>
        )}
        <TableCell align="right">{props.shipment.totalWeight}</TableCell>
        <TableCell align="right">{props.shipment.dimensions}</TableCell>
        <TableCell align="right">
          {props.shipment.productNames.join(", ")}
        </TableCell>
    </TableRow>
  );
}

Shipment.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Shipment);



const parsedStatus = n => {
  if (n.status === 0) {
    return "Unknown";
  }
  if (n.status === 1) {
    return "Shipping";
  }
  if (n.status === 2) {
    return "En-Route";
  }
  if (n.status === 3) {
    return "Out-For-Delivery";
  }
  if (n.status === 4) {
    return "Delivered";
  }
  if (n.status === 5) {
    return "Delayed";
  }
};

const statusStyling = n => {
  if (n.status === 0) {
    return {
      textDecoration: "underline",
      textDecorationColor: "#ffa9a8",
      borderRadius: "25px",
      paddingRight: "55px"
    };
  }
  if (n.status === 1) {
    return {
      textDecoration: "underline",
      textDecorationColor: "#ffc642",
      borderRadius: "25px",
      paddingRight: "55px"
    };
  }
  if (n.status === 2) {
    return {
      textDecoration: "underline",
      textDecorationColor: "#ffc642",
      borderRadius: "25px",
      paddingRight: "55px"
    };
  }
  if (n.status === 3) {
    return {
      textDecoration: "underline",
      textDecorationColor: "#ffc642",
      borderRadius: "25px",
      paddingRight: "55px"
    };
  }
  if (n.status === 4) {
    return {
      textDecoration: "underline",
      textDecorationColor: "#a7c2a6",
      borderRadius: "25px",
      paddingRight: "55px"
    };
  }
  if (n.status === 5) {
    return {
      textDecoration: "underline",
      textDecorationColor: "#ffa9a8",
      borderRadius: "25px",
      paddingRight: "55px"
    };
  }
};