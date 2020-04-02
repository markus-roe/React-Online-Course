import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Secret from './Secret';
import Register from './Register';
import Login from './Login';
import Restricted from './Restricted';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
	return (
		<div>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<ProtectedRoute roles={[ 'admin', 'manager' ]} path="/secret" component={Secret} />
				<ProtectedRoute roles={[ 'admin' ]} path="/restricted" component={Restricted} />
			</Switch>
		</div>
	);
};

export default App;
