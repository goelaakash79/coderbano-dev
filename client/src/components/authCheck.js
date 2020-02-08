export default () => {
	const token = localStorage.getItem("token");
	const user_id = localStorage.getItem("user_id");

	if (token && user_id) {
		var base64Url = token.split(".")[1];
		var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		var jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map(function(c) {
					return (
						"%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
					);
				})
				.join("")
		);

		return { isLoggedIn: true, user: JSON.parse(jsonPayload) };
	}
	return { isLoggedIn: false, user: null };
};
