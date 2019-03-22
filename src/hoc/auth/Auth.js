import React from 'react';
import { getAuth } from '../../store/actions/userActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
	return {
		isAuth: state.userReducer.Authenticated,
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{ getAuth },
	)(function(Component) {
		return class Authenticated extends React.Component {
			componentDidMount() {
				this.props.getAuth();
			}
			render() {
				return (
					<>
						{this.props.isAuth === true ? (
							<Component {...this.props} />
						) : (
							this.props.history.push('/login')
						)}
					</>
				);
			}
		};
	}),
);
