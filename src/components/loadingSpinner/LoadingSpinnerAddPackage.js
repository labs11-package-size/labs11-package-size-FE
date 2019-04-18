import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
	root: {
		width: 'auto',
		display: 'flex',
		flexWrap: 'wrap',
	},
});

class LoadingSpinner extends React.Component {
	
componentDidUpdate() {
	if (this.props.success === true) {
		this.props.history.push('/shipments')
	}
}

	render() {
		return (
		<div>
			<CircularProgress 
			/>
		</div>
	);
};
}

const mapStateToProps = state => {
	return {
		success: state.shipmentsReducer.success,
	};
};


export default connect(
	mapStateToProps,
	null
  )(withStyles(styles)(LoadingSpinner));
