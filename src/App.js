import React, { Component } from 'react';
import './styles/css/App.css';
import LoginView from './containers/loginView/LoginView';

class App extends Component {
	render() {
		return (
			<div className="App">
				<LoginView />
			</div>
		);
	}
}

export default App;
