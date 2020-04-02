import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

const Register = () => {
	const history = useHistory();
	const registerForm = useRef(null);
	const [ email, setEmail ] = useState('');
	const [ user, setUser ] = useState({ first_name: '', last_name: '', email: '', password: '', errors: {} });

	const onChange = () => {
		const form = registerForm.current;

		setUser({
			first_name : form['first_name'].value,
			last_name  : form['last_name'].value,
			email      : form['email'].value,
			password   : form['password'].value
		});
	};

	const onSubmit = (event) => {
		event.preventDefault();
		fetch('/api/register', {
			method  : 'POST',
			body    : JSON.stringify(user),
			headers : {
				'Content-Type' : 'application/json'
			}
		})
			.then((res) => {
				if (res.status === 200) {
					history.push('/login');
				} else {
					const error = new Error(res.error);
					throw error;
				}
			})
			.catch((err) => {
				console.error(err);
				alert('Error logging in please try again');
			});
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6 mt-5 mx-auto">
					<form ref={registerForm} noValidate onSubmit={onSubmit}>
						<h1 className="h3 mb-3 font-weight-normal">Register</h1>
						<div className="form-group">
							<label htmlFor="name">First name</label>
							<input
								type="text"
								className="form-control"
								name="first_name"
								placeholder="Enter your first name"
								value={user.first_name}
								onChange={() => {
									onChange();
								}}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="name">Last name</label>
							<input
								type="text"
								className="form-control"
								name="last_name"
								placeholder="Enter your last name"
								value={user.last_name}
								onChange={() => {
									onChange();
								}}
							/>
						</div>
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
							Register!
						</button>
					</form>
				</div>
			</div>
		</div>
		// <form ref={registerForm} onSubmit={onSubmit}>
		// 	<h1>Register Below!</h1>
		// 	<input
		// 		type="email"
		// 		name="email"
		// 		placeholder="Enter email"
		// 		value={email}
		// 		onChange={() => {
		// 			handleEmailChange();
		// 		}}
		// 		required
		// 	/>
		// 	<input
		// 		type="password"
		// 		name="password"
		// 		placeholder="Enter password"
		// 		value={password}
		// 		onChange={() => {
		// 			handlePasswordChange();
		// 		}}
		// 		required
		// 	/>
		// 	<input type="submit" value="Submit" />
		// </form>
	);
};

export default Register;
