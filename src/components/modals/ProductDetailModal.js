import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import PopoutIcon from '@material-ui/icons/LibraryBooks'
import Tooltip from '@material-ui/core/Tooltip';

import DeleteModal from './deleteModal';
import DeletePopover from '../modals/DeletePopover';


function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const styles = theme => ({
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 60,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: 'none'
	},
});

class ProductDetailModal extends React.Component {
	state = {
		open: false,
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;

		return (
			<div>
				<span onClick={this.handleOpen}>
				<Tooltip title="Product Details" disableFocusListener={this.state.open}>
					<PopoutIcon />
				</Tooltip>
				</span>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}>
					<div style={getModalStyle()} className={classes.paper}>
                        <div>
                            <Typography variant="h6" id="modal-title">
                              {this.props.product.name}  
                            </Typography>
                        </div>
                        <div>
                            {/* route to shipments */}
							<Button >Pack It</Button>
						</div>
                        <div aria-label="delete">
                            <DeleteModal
                                delete={() =>
                                    this.props.deleteProduct(this.props.product.uuid)
                                }
                            />
                        </div>
                        <div>
                            <Typography variant="h6" id="modal-title">
                                Product Information
                            </Typography>
                            <div>
                                <Typography>
                                    Description: {this.props.product.productDescription}
                                </Typography>
                                <Typography className={classes.heading}>
                                    Price: {this.props.product.value}
                                </Typography>
                                <Typography className={classes.heading}>
                                    Fragile: {this.props.product.fragile}
                                </Typography>
                            </div>
                            <div>
                                <Typography className={classes.heading}>
                                    Product Dimensions:
                                </Typography>
                                <Typography className={classes.heading}>
                                    Length: {this.props.product.length}"
                                </Typography>
                                <Typography className={classes.heading}>
                                    Width: {this.props.product.width}"
                                </Typography>
                                <Typography className={classes.heading}>
                                    Height: {this.props.product.height}"
                                </Typography>
                            </div>
                        </div>
                        {/* <div>
                            <Typography variant="h6" id="modal-title">
                                Shipment Information
                            </Typography>
                            <Typography variant="h6" id="modal-title">
                                Shipped To {this.props.shipment.shippedTo}
                            </Typography>
                            <Typography variant="h6" id="modal-title">
                                Tracking Number: {this.props.shipment.trackingNumber}
                            </Typography>
                            <Typography variant="h6" id="modal-title">
                                {this.props.shipment.shippingType}
                            </Typography>
                            <Typography variant="h6" id="modal-title">
                                Box Dimensions: {this.props.shipment.dimensions}
                            </Typography>
                            <Typography variant="h6" id="modal-title">
                                Total Item Weight:{this.props.shipment.totalWeight}
                            </Typography>
                        </div> */}
                        <div>
							<Button onClick={this.handleClose}>Close</Button>
							{this.props.children}
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

ProductDetailModal.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductDetailModal);