import React from 'react';

const LogoutView = props => (
	<div>
		Sorry to see you go.
		{setTimeout(() => {
			props.history.push('/login');
		}, 2000)}
	</div>
);

export default LogoutView;
