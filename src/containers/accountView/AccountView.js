import React, { Component } from 'react';
import Account from '../../components/account/Account';
import { connect } from 'react-redux';

import { getAuth, getAccountInfo, editUser } from '../../store/actions/userActions';
import EditAccount from '../../components/account/EditAccount';

class AccountView extends Component {
	state = {
        user: {
            displayName: this.props.displayName,
            email: this.props.email,
		},
		userInfo: '',
	};

	handleInputChange = e => {
		this.setState({ 
			user: {
				[e.target.name]: e.target.value,
			}
        })
    };
    
    editAccount = (user) => {
        this.props.editAccount(user)
        this.setState({ editingUserInfo: false });
	};

	componentDidUpdate(prevProps) {
		if (this.state.userInfo !== this.props.userInfo) {
			this.setState({ userInfo: this.props.userInfo })
		} 
	};
	
	componentDidMount() {
		this.props.getAuth();
		this.props.getAccountInfo();
	};

	render() {
		return (
			<div>
				<Account 
					editAccount={() => this.editAccount(this.state.user)}
                    handleInputChange={this.handleInputChange}
                    user={this.state.user}
					editingUserInfo={this.editingUserInfo}
					userInfo={this.state.userInfo}
				/>
				<EditAccount 
					user={this.props.userInfo} 
					editUser={this.editUser}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.userReducer.isLoggedIn,
		userInfo: state.userReducer.userInfo,
	};
};

export default connect(
	mapStateToProps,
	{ getAuth, getAccountInfo, editUser },
)(AccountView);
