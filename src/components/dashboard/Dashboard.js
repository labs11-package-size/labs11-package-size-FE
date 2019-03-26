import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import ProductListView from '../../containers/productView/ProductListView';

import { getProducts } from '../../store/actions/productActions';
import { getShipment } from '../../store/actions/shipmentActions';
import ShipmentListView from '../../containers/shipmentView/ShipmentListView';

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

class Dashboard extends Component {
	// state = {
	// 	products: this.props.products,
	// };
	componentDidMount() {
		this.props.getProducts();
		//this.props.getShipments();
	}
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.mainContainer}>
				<ProductListView products={this.props.products} />
				<ShipmentListView shipments={this.props.shipments} />

				{/* <Typography gutterBottom variant="h5" component="h2">
					Shipments
				</Typography>
				<div className={classes.cardContainer}>
					<Card className={classes.card}>
						<CardActionArea>
							<CardMedia
								className={classes.media}
								image="/static/images/cards/contemplative-reptile.jpg" // product image
								title="image title"
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="h2">
									Customer Name:
								</Typography>
								<Typography component="p">Destination City:</Typography>
								<Typography component="p">Product Name:</Typography>
								<Typography component="p">Shipment Date:</Typography>
							</CardContent>
						</CardActionArea>
						<CardActions>
							<Button size="small" color="primary">
								View Details
							</Button>
						</CardActions>
					</Card>
					<Card className={classes.card}>
						<CardActionArea>
							<CardMedia
								className={classes.media}
								image="/static/images/cards/contemplative-reptile.jpg" // product image
								title="image title"
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="h2">
									Customer Name:
								</Typography>
								<Typography component="p">Destination City:</Typography>
								<Typography component="p">Product Name:</Typography>
								<Typography component="p">Shipment Date:</Typography>
							</CardContent>
						</CardActionArea>
						<CardActions>
							<Button size="small" color="primary">
								View Details
							</Button>
						</CardActions>
					</Card>
					<Card className={classes.card}>
						<CardActionArea>
							<CardMedia
								className={classes.media}
								image="/static/images/cards/contemplative-reptile.jpg" // product image
								title="image title"
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="h2">
									Customer Name:
								</Typography>
								<Typography component="p">Destination City:</Typography>
								<Typography component="p">Product Name:</Typography>
								<Typography component="p">Shipment Date:</Typography>
							</CardContent>
						</CardActionArea>
						<CardActions>
							<Button size="small" color="primary">
								View Details
							</Button>
						</CardActions>
					</Card> */}
					{/* <Button size="small" color="primary">
						See All Shipments
					</Button>
				</div> */}
			</div>
		);
	}
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	return {
		products: state.productReducer.products,
		//shipment: state.shipmentReducer.shipment,
	};
};

export default connect(
	mapStateToProps,
	{
		getProducts,
		getShipment,
	},
)(withStyles(styles)(Dashboard));
