import React, { useState, useMemo } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Secret from './Secret';
import Register from './Register';
import Login from './Login';
import Restricted from './Restricted';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Navbar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/about" component={About} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<ProtectedRoute roles={[ 'admin', 'manager' ]} path="/secret" component={Secret} />
					<ProtectedRoute roles={[ 'admin' ]} path="/restricted" component={Restricted} />
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default App;
