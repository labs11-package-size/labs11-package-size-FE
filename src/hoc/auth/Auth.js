import React from 'react';
// import { getAuth } from '../../store/actions/userActions';
// import { connect } from 'react-redux';
// import { withRouter, Route, Redirect } from 'react-router-dom';

// const PrivateRoute = ({ component: Component, ...rest }) => (
// 	<Route
// 		{...rest}
// 		render={props =>
// 			props.isAuthenticated === true ? (
// 				<Component {...props} />
// 			) : (
// 				<Redirect to="/login" />
// 			)
// 		}
// 	/>
// );

// const mapStateToProps = state => {
// 	console.log(state.userReducer.Authenticated);
// 	return {
// 		isAuthenticated: state.userReducer.Authenticated,
// 	};
// };

// export default withRouter(
// 	connect(
// 		mapStateToProps,
// 		{ getAuth },
// 	)(PrivateRoute),
// );

// export default withRouter(
// 	connect(
// 		mapStateToProps,
// 		{ getAuth },
// 	)(function(Component) {
// 		return class Authenticated extends React.Component {
// 			componentDidMount() {
// 				this.props.getAuth();
// 			}
// 			render() {
// 				return (
// 					<>
// 						{this.props.isAuth === true ? (
// 							<Component {...this.props} />
// 						) : (
// 							this.props.history.push('/login')
// 						)}
// 					</>
// 				);
// 			}
// 		};
// 	}),
// );

export default function(Component) {
	return class Authenticated extends React.Component {
		render() {
			const token = localStorage.getItem('token');
			const notLoggedIn = <div>Please login</div>;

			return <> {token ? <Component {...this.props} /> : notLoggedIn} </>;
		}
	};
}
