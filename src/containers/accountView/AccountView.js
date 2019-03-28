import React from 'react';
import Account from '../../components/account/Account';

const AccountView = ({ user }) => {
	return (
		<div>
			<Account user={user} />
		</div>
	);
};

export default AccountView;
