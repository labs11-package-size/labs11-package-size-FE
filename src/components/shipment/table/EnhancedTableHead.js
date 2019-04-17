import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";

class EnhancedTableHead extends React.Component {
  createSortHandler = (event, property) => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              style={{ color: "#72BDA2" }}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {shipmentTitles.map(
            (shipment, index) =>
              index === 1 ? (
                <TableCell
                  align="center"
                  padding="default"
                  onClick={event => this.createSortHandler(event, shipment.id)}
                >
                  <TableSortLabel>{shipment.label}</TableSortLabel>
                </TableCell>
              ) : (
                <TableCell
                  align="right"
                  padding="default"
                  onClick={event => this.createSortHandler(event, shipment.id)}
                >
                  <TableSortLabel>{shipment.label}</TableSortLabel>
                </TableCell>
              ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

const shipmentTitles = [
  {
    id: "shipDateUnix",
    numeric: false,
    disablePadding: false,
    label: "Time Created"
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status"
  },
  {
    id: "totalWeight",
    numeric: false,
    disablePadding: false,
    label: "Net Weight"
  },
  {
    id: "dimensions",
    numeric: false,
    disablePadding: false,
    label: "Dimensions (inches)"
  },
  {
    id: "productNames",
    numeric: false,
    disablePadding: false,
    label: "Product Names"
  }
];

export default EnhancedTableHead;
