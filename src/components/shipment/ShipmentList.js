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

// class ShipmentList extends React.Component {
// 	state = {
// 		order: 'desc',
// 		orderBy: 'shipDateUnix',
// 		selected: [],
// 		data: [],
// 		page: 0,
// 		rowsPerPage: 10,
// 	};
// 	componentDidMount() {
// 		if (this.props.previousRowsPerPage) {
// 			this.setState({
// 				data: this.props.shipments,
// 				page: this.props.previousPage,
// 				rowsPerPage: this.props.previousRowsPerPage,
// 			});
// 		} else {
// 			this.setState({ data: this.props.shipments });
// 		}
// 	}

// 	handleRequestSort = (event, property) => {
// 		const orderBy = property;
// 		let order = 'desc';

// 		if (this.state.orderBy === property && this.state.order === 'desc') {
// 			order = 'asc';
// 		}

// 		this.setState({ order, orderBy });
// 	};

// 	handleSelectAllClick = event => {
// 		if (event.target.checked) {
// 			this.setState(state => ({ selected: state.data.map(n => n.uuid) }));
// 			return;
// 		}
// 		this.setState({ selected: [] });
// 	};

// 	handleClick = (event, uuid) => {
// 		const { selected } = this.state;
// 		const selectedIndex = selected.indexOf(uuid);
// 		let newSelected = [];

// 		if (selectedIndex === -1) {
// 			newSelected = newSelected.concat(selected, uuid);
// 		} else if (selectedIndex === 0) {
// 			newSelected = newSelected.concat(selected.slice(1));
// 		} else if (selectedIndex === selected.length - 1) {
// 			newSelected = newSelected.concat(selected.slice(0, -1));
// 		} else if (selectedIndex > 0) {
// 			newSelected = newSelected.concat(
// 				selected.slice(0, selectedIndex),
// 				selected.slice(selectedIndex + 1),
// 			);
// 		}

// 		this.setState({ selected: newSelected });
// 	};

// 	handleChangePage = (event, page) => {
// 		this.setState({ page });
// 	};

// 	handleChangeRowsPerPage = event => {
// 		this.setState({ rowsPerPage: event.target.value });
// 	};

// 	isSelected = uuid => this.state.selected.indexOf(uuid) !== -1;

// 	render() {
// 		const { classes } = this.props;
// 		const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
// 		const emptyRows =
// 			rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

// 		return (
// 			<Paper className={classes.root}>
// 				<EnhancedTableToolbar
// 					{...this.props}
// 					currentPage={this.state.page}
// 					currentRowsPerPage={this.state.rowsPerPage}
// 					deleteShipment={this.props.deleteShipment}
// 					selected={selected}
// 					numSelected={selected.length}
// 				/>
// 				<div className={classes.tableWrapper}>
// 					<Table className={classes.table} aria-labelledby="tableTitle">
{
  /* <EnhancedTableHead
							shipments={this.props.shipments}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={this.handleSelectAllClick}
							onRequestSort={this.handleRequestSort}
							rowCount={data.length}
						/> */
}
// 						<TableBody>
// 							{stableSort(data, getSorting(order, orderBy))
// 								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// 								.map(n => {
// 									const isSelected = this.isSelected(n.uuid);
// 									const parsedStatus = () => {
// 										if (n.status === 0) {
// 											return 'Unknown';
// 										}
// 										if (n.status === 1) {
// 											return 'Shipping';
// 										}
// 										if (n.status === 2) {
// 											return 'En-Route';
// 										}
// 										if (n.status === 3) {
// 											return 'Out-For-Delivery';
// 										}
// 										if (n.status === 4) {
// 											return 'Delivered';
// 										}
// 										if (n.status === 5) {
// 											return 'Delayed';
// 										}
// 									};
// 									const statusStyling = () => {
// 										if (n.status === 0) {
// 											return {
// 												backgroundColor: '#ffa9a8',
// 												borderRadius: '25px',
// 												paddingRight: '5px',
// 											};
// 										}
// 										if (n.status === 1) {
// 											return {
// 												backgroundColor: '#ffc642',
// 												borderRadius: '25px',
// 												paddingRight: '5px',
// 											};
// 										}
// 										if (n.status === 2) {
// 											return {
// 												backgroundColor: '#ffc642',
// 												borderRadius: '25px',
// 												paddingRight: '5px',
// 											};
// 										}
// 										if (n.status === 3) {
// 											return {
// 												backgroundColor: '#ffc642',
// 												borderRadius: '25px',
// 												paddingRight: '5px',
// 											};
// 										}
// 										if (n.status === 4) {
// 											return {
// 												backgroundColor: '#a7c2a6',
// 												borderRadius: '25px',
// 												paddingRight: '5px',
// 											};
// 										}
// 										if (n.status === 5) {
// 											return {
// 												backgroundColor: '#ffa9a8',
// 												borderRadius: '25px',
// 												paddingRight: '5px',
// 											};
// 										}
// 									};
// 									return (
// 										<TableRow
// 											hover
// 											role="checkbox"
// 											aria-checked={isSelected}
// 											tabIndex={-1}
// 											key={n.uuid}
// 											selected={isSelected}>
// 											<TableCell padding="checkbox">
// 												<Checkbox
// 													onClick={event => this.handleClick(event, n.uuid)}
// 													checked={isSelected}
// 												/>
// 											</TableCell>
// 											<TableCell align="left">{n.dateShipped}</TableCell>
// 											<TableCell align="left" style={statusStyling()}>
// 												{parsedStatus()}
// 											</TableCell>
// 											<TableCell align="left">{n.shippedTo}</TableCell>
// 											<TableCell align="left">
// 												{n.productNames.join(', ')}
// 											</TableCell>
// 											<TableCell>
// 												<div style={{ cursor: 'pointer' }}>
// 													<ViewShipmentModal shipment={n} />
// 												</div>
// 											</TableCell>
// 										</TableRow>
// 									);
// 								})}
// 							{emptyRows > 0 && (
// 								<TableRow style={{ height: 49 * emptyRows }}>
// 									<TableCell colSpan={5} />
// 								</TableRow>
// 							)}
// 						</TableBody>
// 					</Table>
// 				</div>
// 				<TablePagination
// 					rowsPerPageOptions={[5, 10, 25]}
// 					component="div"
// 					count={data.length}
// 					rowsPerPage={rowsPerPage}
// 					page={page}
// 					backIconButtonProps={{
// 						'aria-label': 'Previous Page',
// 					}}
// 					nextIconButtonProps={{
// 						'aria-label': 'Next Page',
// 					}}
// 					onChangePage={this.handleChangePage}
// 					onChangeRowsPerPage={this.handleChangeRowsPerPage}
// 				/>
// 			</Paper>
// 		);
// 	}
// }

// ShipmentList.propTypes = {
// 	classes: PropTypes.object.isRequired,
// };

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
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
      rowsPerPage: 10
    };
  }

  handleFilter = () => {
    let trackedList = this.props.shipments.map(
      shipment => shipment.tracked !== 0
    );
    return trackedList;
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <FormGroup>
          <FormControlLabel
            control={<Switch onClick={() => this.props.filter()} />}
            label="See Tracked Packages"
          />
        </FormGroup>
		<EnhancedTableToolbar
					{...this.props}
					currentPage={this.state.page}
					currentRowsPerPage={this.state.rowsPerPage}
					deleteShipment={this.props.deleteShipment}
					selected={selected}
					numSelected={selected.length}
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
          {this.props.shipments &&
            this.props.shipments.map(shipment => {
              return <Shipment key={shipment.uuid} shipment={shipment} />;
            })}
          <TableBody />
        </Table>
		</div>
      </Paper>
    );
  }
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

export default compose(
  withRouter(
    connect(
      null,
      {}
    )(withStyles(styles)(ShipmentList))
  )
);
