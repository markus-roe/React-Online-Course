import React, { Component } from "react";

let logOut = () => {
	fetch("logout", {
		method : "get"
	})
		.then(function (response) {
			if (response.redirected) {
				return window.location.replace(response.url);
			}
		})
		.catch(function (err) {
			console.log(err);
		});
};

export default logOut;
