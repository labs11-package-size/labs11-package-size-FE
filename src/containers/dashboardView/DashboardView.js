import React from 'react';
import Dashboard from '../../components/dashboard/Dashboard';

const DashboardView = ({ user }) => {
	return (
		<div>
			<Dashboard user={user} />
		</div>
	);
};

export default DashboardView;
