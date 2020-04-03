const Logout = () => {
	fetch('logout', {
		method      : 'get',
		credentials : 'include'
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

export default Logout;
