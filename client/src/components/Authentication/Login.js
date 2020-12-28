import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { Link } from "react-router-dom";
import Common from "./Common";
import authCheck from "../authCheck";
import { loginService } from "../../utils/services/authService";
import ButtonLoading from "../ButtonLoading";

const Login = props => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const user = authCheck();

	useEffect(() => {
		if (user.isLoggedIn) {
			return props.history.push("/");
		}
	}, [props.history, user.isLoggedIn]);

	const handleSubmit = async e => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const data = { handle: username, password };
			const res = await loginService(data);
			if (res.error === true) {
				toast.error(res.message);
			}
			if (res.message === "success") {
				toast.success("Welcome to Coderbano");

				const token = res.token;
				localStorage.setItem("token", token);
				localStorage.setItem("user_id", res.data._id);
				props.history.push("/");
			}
			setIsLoading(false);
		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
	};
	return (
		<div className="container">
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnVisibilityChange
				draggable
				pauseOnHover
			/>

			<div className="row pt-5 mt-5 mb-5 pb-5">
				<Common />
				<div className="col-md-5 mt-5 pt-5">
					<div className="card register-box p-4 mb-4">
						<h5 className="fontBd">Hey coder!</h5>
						<p className="fontMd mb-3 mt-4">
							Enter account details
						</p>
						<form onSubmit={handleSubmit}>
							<input
								placeholder="enter your username"
								type="text"
								name="username"
								required
								onChange={e => setUsername(e.target.value)}
								className="form-control mb-2"
							/>

							<input
								placeholder="enter your password"
								type="password"
								name="password"
								required
								onChange={e => setPassword(e.target.value)}
								className="form-control mb-4"
							/>

							<button
								className="button"
								// loading={isLoading}
								disabled={isLoading}
							>
								<ButtonLoading isLoading={isLoading} />
								<span hidden={isLoading}>Start Coding</span>
							</button>

							<hr className="box-hr" />
							<p className="mb-0" style={{ fontSize: 16 }}>
								<Link
									to="/register"
									style={{ color: "#424242" }}
								>
									Don't have an account? Register here
								</Link>
							</p>
							{/* <h5 className="text-center hint mb-0">Follow us on twitter</h5> */}
						</form>
					</div>
					{/* <div className="stalk-friend col-12">
						<FaGhost /> Stalk your friend
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default Login;
