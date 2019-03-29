import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import axios from 'axios';

import Shipment from './Shipment';
import { getShipments } from '../../store/actions/shipmentActions';

const styles = {
	card: {
		maxWidth: 250,
		margin: 20,
	},
	media: {
		height: 140,
	},
	cardContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	mainContainer: {
		maxWidth: 1100,
	},
};

axios.defaults.baseURL = 'https://scannarserver.herokuapp.com/api';
axios.interceptors.request.use(
	function(options) {
		options.headers.authorization = localStorage.getItem('token');

		return options;
	},
	function(error) {
		return Promise.reject(error);
	},
);

class ShipmentList extends Component {
	state = {
		shipments: [],
	};
	componentDidMount() {
		axios
			.get('/shipments')
			.then(res => {
				this.setState({
					shipments: res.data,
				});
			})
			.catch(err => console.log(err));
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.mainContainer}>
				<Typography gutterBottom variant="h5" component="h2">
					Shipments
				</Typography>
				{!this.state.shipments ? ( //shipments plural
					<h5>...loading</h5>
				) : (
					this.state.shipments.map(shipment => {
						//shipments plural
						return <Shipment key={shipment.identifier} shipment={shipment} />;
					})
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {};
};

export default connect(
	mapStateToProps,
	{ getShipments },
)(withStyles(styles)(ShipmentList));
