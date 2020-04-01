import React, { useState, useEffect } from 'react';

const Secret = () => {
	const [ secret, setSecret ] = useState('Loading...');

	useEffect(() => {
		fetch('/api/secret').then((res) => res.text()).then((res) => setSecret(res));
	}, []);
	return (
		<div>
			<h1>Secret</h1>
			<p>{secret}</p>
		</div>
	);
};

export default Secret;
