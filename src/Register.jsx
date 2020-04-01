import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

const Register = () => {
	const history = useHistory();
	const registerForm = useRef(null);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const user = {
		email    : email,
		password : password
	};

	const handleEmailChange = () => {
		const form = registerForm.current;
		setEmail(form['email'].value);
	};

	const handlePasswordChange = () => {
		const form = registerForm.current;
		setPassword(form['password'].value);
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
		<form ref={registerForm} onSubmit={onSubmit}>
			<h1>Register Below!</h1>
			<input
				type="email"
				name="email"
				placeholder="Enter email"
				value={email}
				onChange={() => {
					handleEmailChange();
				}}
				required
			/>
			<input
				type="password"
				name="password"
				placeholder="Enter password"
				value={password}
				onChange={() => {
					handlePasswordChange();
				}}
				required
			/>
			<input type="submit" value="Submit" />
		</form>
	);
};

export default Register;
