import React, { useState, useRef, useContext } from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom';

//TODO: Add error message!

const Login = () => {
	const history = useHistory();
	const loginForm = useRef(null);
	const [ errorMessage, setErrorMessage ] = useState('');

	const [ user, setUser ] = useState({
		email    : '',
		password : ''
	});

	const onChange = () => {
		const form = loginForm.current;
		form['email'].className = 'form-control';
		form['password'].className = 'form-control';
		setErrorMessage('');
		setUser({
			email    : form['email'].value,
			password : form['password'].value
		});
	};

	const onSubmit = (event) => {
		event.preventDefault();
		fetch('/api/login', {
			method  : 'POST',
			body    : JSON.stringify(user),
			headers : {
				'Content-Type' : 'application/json'
			}
		})
			.then((res) => {
				if (res.status !== 200) {
					const error = new Error(res.error);
					throw error;
				}
				return res.json();
			})
			.then((res) => {
				history.push('/');
			})
			.catch((err) => {
				const form = loginForm.current;
				form['email'].className += ' text-danger is-invalid';
				form['password'].className += ' text-danger is-invalid';
				setErrorMessage('Invalid email or password!');
			});
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6 mt-5 mx-auto">
					<form ref={loginForm} noValidate onSubmit={onSubmit}>
						<h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
						<div className="form-group">
							<label htmlFor="email">Email address</label>
							<input
								type="email"
								className="form-control"
								name="email"
								placeholder="Enter email"
								value={user.email}
								onChange={() => {
									onChange();
								}}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								className="form-control"
								name="password"
								placeholder="Password"
								value={user.password}
								onChange={() => {
									onChange();
								}}
							/>
						</div>

						<button type="submit" className="btn btn-lg btn-primary btn-block">
							Sign in
						</button>
						<div className="errorMessage">{errorMessage}</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
