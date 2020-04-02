import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

export default class ProtectedRoute extends Component {
	constructor () {
		super();
		this.state = {
			loading  : true,
			redirect : false
		};
	}

	componentDidMount () {
		const roles = this.props.roles;

		const requestOptions = {
			method  : 'POST',
			headers : { 'Content-Type': 'application/json' },
			body    : JSON.stringify({ roles: roles })
		};
		fetch('/checkToken', requestOptions)
			.then((res) => {
				if (res.status === 200) {
					this.setState({ loading: false });
				} else {
					const error = new Error(res.error);
					throw error;
				}
			})
			.catch((err) => {
				// console.error(err);
				this.setState({ loading: false, redirect: true });
			});
	}

	render () {
		const { loading, redirect } = this.state;
		if (loading) {
			return null;
		}
		if (redirect) {
			return <Redirect to="/login" />;
		}
		return <Route path={this.props.path} component={this.props.component} />;
	}
}

// const ProtectedRoute = (props) => {
// 	const [ loading, setLoading ] = useState('true');
// 	const [ redirect, setRedirect ] = useState('false');
// 	useEffect(() => {
// 		fetch('/checkToken')
// 			.then((res) => {
// 				if (res.status === 200) {
// 					console.log('200');
// 					setLoading({ loading: false });
// 				} else {
// 					const error = new Error(res.error);
// 					throw error;
// 				}
// 			})
// 			.catch((err) => {
// 				console.log('catch');
// 				setLoading(false);
// 				setRedirect(true);
// 			});
// 	}, []);

// 	if (redirect) {
// 		return <Redirect to="/login" />;
// 	}
// 	if (loading) {
// 		return <Redirect to="/login" />;
// 	}
// 	return <Route path={props.url} component={props.component} />;
// };
// export default ProtectedRoute;
