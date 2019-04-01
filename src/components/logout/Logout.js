import React from 'react';

const Logout = props => {
	return (
		<div>
			Sorry to see you go.
			{props.redir()}
		</div>
	);
};

export default Logout;
