import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import PopoutIcon from "@material-ui/icons/LibraryBooks";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import ViewShipmentModal from "../modals/ViewShipmentModal";
import { Button } from "@material-ui/core";
import { helpers } from "handlebars";
import Shipment from "../shipment/Shipment";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import EnhancedTableHead from "./table/EnhancedTableHead";
import EnhancedTableToolbar from "./table/EnhancedTableToolbar";



const styles = theme => ({
  root: {
    marginTop: "10px",
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "visible"
  },
  table: {
    minWidth: 700,
    marginTop: "10px",
    [theme.breakpoints.down("sm")]: {
      minWidth: "0",
    }
  },
  switch: {
    margin: "0px 20px 0"
  },
  paginationroot: {
    [theme.breakpoints.down("sm")]: {
      height: "auto"
    }
  },
  paginationtoolbar: {
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      flexDirection: "column"

    }

  }
});

class ShipmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "desc",
      orderBy: "shipDateUnix",
      selected: [],
      data: [],
      page: 0,
      filter: true,
      rowsPerPage: 10,
      modal: false,
      trackingNumber: ""
    };
  }

  componentDidMount() {
    if (this.props.previousRowsPerPage) {
      if (this.props.previousFilter) {
        this.setState({
          data: this.props.shipments.filter(shipment => {
            return shipment.tracked !== 1;
          }),
          filter: this.props.previousFilter,
          page: this.props.previousPage,
          rowsPerPage: this.props.previousRowsPerPage
        });
      } else {
        this.setState({
          data: this.props.shipments.filter(shipment => {
            return shipment.tracked !== 0;
          }),
          filter: this.props.previousFilter,
          page: this.props.previousPage,
          rowsPerPage: this.props.previousRowsPerPage
        });
      }
    } else {
      this.setState({
        data: this.props.shipments.filter(shipment => {
          return shipment.tracked !== 1;
        })
      });
    }
  }

  submitTracking = (e, uuid) => {
    e.preventDefault();
    const trackingSubmission = this.state.trackingNumber.slice();
    this.props.addShipment(trackingSubmission, uuid);
  };

  handleCloseModal = () => {
    this.setState({ trackingNumber: "" }, () => this.props.closeModal());
  };

  handleFilter = () => {
    this.setState(
      {
        filter: this.state.filter === false ? true : false,
        selected: []
      },
      () => this.handleRenderList()
    );
  };

  handleRenderList = () => {
    if (this.state.filter === false) {
      this.setState({
        data: this.props.shipments.filter(shipment => {
          return shipment.tracked !== 0;
        })
      });
    } else {
      this.setState({
        data: this.props.shipments.filter(shipment => {
          return shipment.tracked !== 1;
        })
      });
    }
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.uuid) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, uuid) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(uuid);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, uuid);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  changeCheckbox = (event, uuid) => {
    event.stopPropagation();
    let item = document.getElementById("tablerow-1");
    switch (item.getAttribute("aria-checked")) {
      case "true":
        item.setAttribute("aria-checked", "false");
        this.handleClick(event, uuid);
        break;
      case "false":
        item.setAttribute("aria-checked", "true");
        this.handleClick(event, uuid);
        break;
    }
  };

  handleChanges = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = uuid => this.state.selected.indexOf(uuid) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          {...this.props}
          filter={this.state.filter}
          currentPage={this.state.page}
          currentRowsPerPage={this.state.rowsPerPage}
          deleteShipment={this.props.deleteShipment}
          selected={selected}
          numSelected={selected.length}
          handleFilter={this.handleFilter}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              shipments={this.props.shipments}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {this.state.data &&
                stableSort(data, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(shipment => {
                    const isSelected = this.isSelected(shipment.uuid);
                    return (
                      <Shipment
                        openModal={this.props.openModal}
                        key={shipment.uuid}
                        shipment={shipment}
                        isSelected={isSelected}
                        handleClick={this.changeCheckbox}
                      />
                    );
                  })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          classes={{ root: classes.paginationroot, toolbar: classes.paginationtoolbar }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        {this.props.modal && (
          <ViewShipmentModal
            addingShipment={this.props.addingShipment}
            shipment={this.props.modal}
            closeModal={this.handleCloseModal}
            modalState={this.props.modalState}
            trackingNumber={this.state.trackingNumber}
            handleChanges={this.handleChanges}
            submitTracking={this.submitTracking}
            errorMessage={this.props.errorMessage}
            failureAdding={this.props.failureAdding}
          />
        )}
      </Paper>
    );
  }
}

ShipmentList.propTypes = {
  classes: PropTypes.object.isRequired
};

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

const getSorting = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
};

export default compose(
  withRouter(
    connect(
      null,
      {}
    )(withStyles(styles)(ShipmentList))
  )
);
