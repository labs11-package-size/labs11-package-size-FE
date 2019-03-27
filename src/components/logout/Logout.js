import React from 'react';

const Logout = props => {
	const redir = () => {
		setTimeout(() => {
			props.history.push('/login');
		}, 2000);
	};
	return (
		<div>
			Sorry to see you go.
			{redir}
		</div>
	);
};

export default Logout;
