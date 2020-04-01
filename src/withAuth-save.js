import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

const WithAuth = (ComponentToProtect) => {
	const [ loading, setLoading ] = useState("true");
	const [ redirect, setRedirect ] = useState("false");

	useEffect(() => {
		fetch("/checkToken")
			.then((res) => {
				if (res.status === 200) {
					setLoading({ loading: false });
				} else {
					const error = new Error(res.error);
					throw error;
				}
			})
			.catch((err) => {
				//console.error(err);
				setLoading(false);
				setRedirect(true);
			});
	}, []);

	if (loading) {
		return null;
	}
	if (redirect) {
		return <Redirect to="/login" />;
	}
	return <ComponentToProtect />;
};

export default WithAuth;
