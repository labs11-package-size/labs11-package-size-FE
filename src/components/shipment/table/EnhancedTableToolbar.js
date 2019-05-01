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
	DeleteText: {
		[theme.breakpoints.down("sm")]: {
			fontSize: "12px"
		 }
	},
	ButtonContainer: {
		width: "500px", 
		display: "flex", 
		justifyContent: "center", 
		alignItems: "center", 
		marginLeft: "30%",
		[theme.breakpoints.down("md")]: {
			marginLeft: "10%"
		},
		[theme.breakpoints.down("sm")]: {
		 marginLeft: "0",
		 width: "auto",
		}
	},
	SelectedButton: {
		color: "white",
		 backgroundColor: "#bd7280",
			border: "1px solid grey",
			[theme.breakpoints.down("sm")]: {
				fontSize: "10px"
			}
	},
	UnselectedButton: {
		border: "1px solid grey",
		[theme.breakpoints.down("sm")]: {
      fontSize: "10px"
    }
	},
	CompareArrows: {
		fontSize: "32px"
	},
	DeleteInfoContainer: {
		display: "flex",
		alignItems: "baseline",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
			marginLeft: "5px"
    }
	}
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
          <div className={classes.ButtonContainer}>
            <Button className={classes.SelectedButton}>View Untracked Shipments</Button>
			<CompareArrows className={classes.CompareArrows} />
            <Button className={classes.UnselectedButton} onClick={() => props.handleFilter()}>View Tracked Shipments</Button>
          </div>
        ) : (
          <div className={classes.ButtonContainer}>
            <Button className={classes.UnselectedButton} onClick={() => props.handleFilter()}>View Untracked Shipments</Button>
			<CompareArrows className={classes.CompareArrows} />
            <Button className={classes.SelectedButton}>View Tracked Shipments</Button>
          </div>
        )}
		<div className={classes.DeleteInfoContainer}>
		<div>
				{numSelected > 0 && (
					<Typography className={classes.DeleteText} color="inherit" variant="subtitle1">
						{numSelected} selected
					</Typography>
				)}
			</div>
			<div>
				{numSelected > 0 && (
					<IconButton className={classes.DeleteButton} aria-label="Delete">
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