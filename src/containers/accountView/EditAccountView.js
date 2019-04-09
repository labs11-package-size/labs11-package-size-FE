// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// import { editUser } from '../../store/actions/userActions';
// import EditAccount from '../../components/account/EditAccount';



// class EditAccountView extends Component {
// 	state = {
//         user: {
//             displayName: this.props.default.displayName,
//             email: this.props.default.email,
//         }
// 	};

// 	handleInputChange = e => {
// 		this.setState({ 
//             ...this.state.user,
//             [e.target.name]: e.target.value,
//         })
//     };
    
//     editAccount = (user) => {
//         this.props.editAccount(user)
//         this.setState({ editingUserInfo: false });
//     };

//     render() {
//         return (
//             <div>
//                 <EditAccount 
//                     editAccount={this.editAccount}
//                     handleInputChange={this.handleInputChange}
//                     user={this.state.user}
//                     editingUserInfo={this.editingUserInfo}
//                 />
//             </div>
//         )
//     }
// }
// const mapStateToProps = state => {
//     return (
//         { editingUserInfoSuccess: state.userReducer.editingUserInfoSuccess }
//     )
// };
// export default connect(
//     mapStateToProps,
//     { editUser },
// )(EditAccountView);