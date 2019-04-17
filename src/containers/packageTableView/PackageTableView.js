// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import { Redirect, Link } from 'react-router-dom';

// import PackageList from '../../components/packageTable/PackageList';

// import { addShipment } from '../../store/actions/shipmentActions';

// import { getPackages, deletePackage } from '../../store/actions/packageActions';

// const styles = {
// 	mainContainer: {
// 		marginBottom: 60,
// 		marginTop: 45,
// 	},
// 	heading: {
// 		marginBottom: 40,
// 	},
// };

// class PackageTableView extends Component {
// 	state = {
// 		previousPage: null,
// 		previousRowsPerPage: null,
// 	};

// 	componentDidMount() {
// 		this.props.getPackages();
// 	}

// 	addShipment = (tracId, prodId) => {
// 		this.props.addShipment(tracId, prodId);
// 		return <Redirect to="/" />;
// 	};

// 	deletePackage = (uuid, currentPage, currentRowsPerPage) => {
// 		this.setState(
// 			{ previousPage: currentPage, previousRowsPerPage: currentRowsPerPage },
// 			() => this.props.deletePackage(uuid.join()),
// 		);
// 		return <Redirect to="/" />;
// 	};

// 	render() {
// 		const { classes } = this.props;
// 		return (
// 			<div className={classes.mainContainer}>
// 				<Typography
// 					className={classes.heading}
// 					gutterBottom
// 					variant="h5"
// 					component="h2">
// 					Packages
// 				</Typography>
// 				{this.props.packages.length > 0 ? (
// 					<div>
// 						<PackageList
// 							previousPage={this.state.previousPage}
// 							previousRowsPerPage={this.state.previousRowsPerPage}
// 							deletePackage={this.deletePackage}
// 							packages={this.props.packages}
// 						/>
// 					</div>
// 				) : (
// 					<PackageList
// 						previousPage={this.state.previousPage}
// 						previousRowsPerPage={this.state.previousRowsPerPage}
// 						deletePackage={this.deletePackage}
// 						packages={this.props.packages}
// 					/>
// 				)}
// 			</div>
// 		);
// 	}
// }

// const mapStateToProps = state => {
// 	return {
// 		packages: state.packageReducer.packages,
// 	};
// };

// export default connect(
// 	mapStateToProps,
// 	{ getPackages, deletePackage, addShipment },
// )(withStyles(styles)(PackageTableView));
