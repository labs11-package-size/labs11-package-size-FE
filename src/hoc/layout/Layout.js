import React from 'react';
import Navigation from '../../components/navigation/Navigation';
import Footer from '../../components/footer/Footer';

const Layout = props => {
	return (
		<div>
			<Navigation />
			<div>{props.children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
