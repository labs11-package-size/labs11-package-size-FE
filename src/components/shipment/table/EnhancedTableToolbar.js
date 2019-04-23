import React from "react"
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DeleteModal from "../../modals/deleteModal";
import Tooltip from "@material-ui/core/Tooltip";
import FilterListIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { Button } from "@material-ui/core";
import CompareArrows from "@material-ui/icons/CompareArrowsRounded";

const styles = theme => ({
	root: {
		width: 'auto',
	},
	table: {
		minWidth: 1020,
	},
	tableWrapper: {
		overflowX: 'auto',
	},
});


const toolbarStyles = theme => ({
	root: {
		paddingRight: theme.spacing.unit,
		display: "flex",
		justifyContent: "space-between"
	},
	highlight:
		theme.palette.type === 'light'
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark,
			  },
	actions: {
		color: theme.palette.text.secondary,
	},
	title: {
		flex: '0 0 auto',
	},
});




let EnhancedTableToolbar = props => {
	const { numSelected, classes } = props;

	return (
		<div>
		<Toolbar
			className={classNames(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}>
			{props.filter ? (
          <div style={{width: "500px", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "30%"}}>
            <Button style={{color: "white", backgroundColor: "#bd7280", border: "1px solid grey"}}>View Untracked Shipments</Button>
			<CompareArrows style={{fontSize: "32px"}} />
            <Button style={{border: "1px solid grey"}} onClick={() => props.handleFilter()}>View Tracked Shipments</Button>
          </div>
        ) : (
          <div style={{width: "500px", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "30%"}}>
            <Button style={{border: "1px solid grey"}} onClick={() => props.handleFilter()}>View Untracked Shipments</Button>
			<CompareArrows style={{fontSize: "32px"}} />
            <Button style={{color: "white", backgroundColor: "#bd7280", border: "1px solid grey"}}>View Tracked Shipments</Button>
          </div>
        )}
		<div style={{ display: "flex", alignItems: "baseline"}}>
		<div className={classes.title}>
				{numSelected > 0 && (
					<Typography color="inherit" variant="subtitle1">
						{numSelected} selected
					</Typography>
				)}
			</div>
			<div className={classes.actions}>
				{numSelected > 0 && (
					<IconButton aria-label="Delete">
						<DeleteModal
							delete={() => {
								props.deleteShipment(
									props.selected,
									props.currentPage,
									props.currentRowsPerPage,
									props.filter
								);
							}}
						/>
					</IconButton>
				)}
				</div>
			</div>
		</Toolbar>
		</div>
	);
};

EnhancedTableToolbar.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);
export default EnhancedTableToolbar;