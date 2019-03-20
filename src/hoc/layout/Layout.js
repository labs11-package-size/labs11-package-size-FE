import React from 'react';
import Navigation from '../../components/navigation/Navigation';
import Footer from '../../components/footer/Footer';
import Routes from '../../routes/Routes';

const Layout = () => {
	return (
		<div>
			<Navigation />
			<Routes />
			<Footer />
		</div>
	);
};

export default Layout;
