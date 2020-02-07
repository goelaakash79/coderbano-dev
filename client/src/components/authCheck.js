export default () => {
	const token = localStorage.getItem("token");
	const user_id = localStorage.getItem("user_id");

	if (token && user_id) {
		return true;
	}
	return false;
};
