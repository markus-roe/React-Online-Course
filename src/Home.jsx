import React, { useState, useEffect } from "react";

const Home = () => {
	const [ message, setMessage ] = useState("Loading...");

	useEffect(() => {
		fetch("/api/home").then((res) => res.text()).then((res) => setMessage(res));
	}, []);

	return (
		<div>
			<h1>Home</h1>
			<p>{message}</p>
		</div>
	);
};
export default Home;
