// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import classnames from 'classnames';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import red from '@material-ui/core/colors/red';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import Icon from '@material-ui/core/Icon';
// import classNames from 'classnames';
// import { loadCSS } from 'fg-loadcss/src/loadCSS';

// import DeleteModal from '../modals/deleteModal';

// const styles = theme => ({
// 	card: {
// 		width: 275,
// 	},
// 	container: {
// 		margin: 40,
// 		width: 'auto',
// 		display: 'flex',
// 	},
// 	formContainer: {
// 		margin: 40,
// 		width: 'auto',
// 		display: 'flex',
// 		flexDirection: 'column',
// 	},
// 	root: {
// 		display: 'flex',
// 		flexWrap: 'wrap',
// 	},
// 	icon: {
// 		margin: theme.spacing.unit * 2,
// 	},
// 	iconHover: {
// 		margin: theme.spacing.unit * 2,
// 		'&:hover': {
// 			color: red[800],
// 		},
// 	},

// 	input: {
// 		margin: theme.spacing.unit,
// 	},
// 	media: {
// 		height: 0,
// 		paddingTop: '56.25%', // 16:9
// 	},
// 	actions: {
// 		display: 'flex',
// 	},
// 	expand: {
// 		transform: 'rotate(0deg)',
// 		marginLeft: 'auto',
// 		transition: theme.transitions.create('transform', {
// 			duration: theme.transitions.duration.shortest,
// 		}),
// 	},
// 	expandOpen: {
// 		transform: 'rotate(180deg)',
// 	},
// 	avatar: {
// 		backgroundColor: red[500],
// 	},
// });

// class Shipment extends Component {
// 	state = { expanded: false };
// 	componentDidMount() {
// 		loadCSS(
// 			'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
// 			document.querySelector('#insertion-point-jss'),
// 		);
// 	}

// 	handleExpandClick = () => {
// 		this.setState(state => ({ expanded: !state.expanded }));
// 	};

// 	render() {
// 		const { classes } = this.props;

// 		return (
// 			<div className={classes.container}>
// 				<div className={classes.root}>
// 					<Card className={classes.card}>
// 						<CardHeader
// 							avatar={
// 								<Avatar aria-label="Recipe" className={classes.avatar}>
// 									S
// 								</Avatar>
// 							}
// 							title={this.props.shipment.productName}
// 							subheader={` Date Shipped: ${this.props.shipment.dateShipped}`}
// 						/>
// 						<CardMedia
// 							className={classes.media}
// 							image="/static/images/cards/paella.jpg"
// 							title="Paella dish"
// 						/>
// 						<CardContent>
// 							<Typography className={classes.heading}>
// 								Shipped To: {this.props.shipment.shippedTo}
// 							</Typography>
// 						</CardContent>
// 						<CardActions className={classes.actions} disableActionSpacing>
// 							<DeleteModal>
// 								<IconButton
// 									onClick={this.props.deleteShipment}
// 									aria-label="Share">
// 									Delete
// 								</IconButton>
// 							</DeleteModal>
// 							<IconButton
// 								className={classnames(classes.expand, {
// 									[classes.expandOpen]: this.state.expanded,
// 								})}
// 								onClick={this.handleExpandClick}
// 								aria-expanded={this.state.expanded}
// 								aria-label="Show more">
// 								<ExpandMoreIcon />
// 							</IconButton>
// 						</CardActions>
// 						<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
// 							<CardContent>
// 								<Typography className={classes.heading}>
// 									Last Updated: {this.props.shipment.lastUpdated}
// 								</Typography>
// 								<Typography className={classes.heading}>
// 									Tracking Number: {this.props.shipment.trackingNumber}
// 								</Typography>
// 								<Typography className={classes.heading}>
// 									Carrier: {this.props.shipment.carrierName}
// 								</Typography>
// 								<Typography className={classes.heading}>
// 									Shipping Type: {this.props.shipment.shippingType}
// 								</Typography>
// 								<Typography className={classes.heading}>
// 									Status: {this.props.shipment.status}
// 								</Typography>
// 							</CardContent>
// 						</Collapse>
// 					</Card>
// 				</div>
// 			</div>
// 		);
// 	}
// }

// Shipment.propTypes = {
// 	classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Shipment);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import Checkbox from '@material-ui/core/Checkbox';
import ViewShipmentModal from '../modals/ViewShipmentModal';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
	},
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
	id += 1;
	return { id, name, calories, fat, carbs, protein };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function Shipment(props) {
	const { classes } = props;
	// const handleFilter = () => {
	// 	if(props.shipment && props.shipment.track === 1) {

	// 	}
	// }
	return (
		<TableRow>
			{/* <TableCell padding="checkbox">
				<Checkbox />
			</TableCell> */}
			<TableCell align="right">{props.shipment.lastUpdated}</TableCell>
			<TableCell align="right">{props.shipment.status}</TableCell>
			<TableCell align="right">{props.shipment.totalWeight}</TableCell>
			<TableCell align="right">{props.shipment.dimensions}</TableCell>
			<TableCell align="right">{props.shipment.productNames}</TableCell>

			<TableCell align="right">
				<ViewShipmentModal shipment={props.shipment} />
			</TableCell>
		</TableRow>
	);
}

Shipment.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Shipment);
