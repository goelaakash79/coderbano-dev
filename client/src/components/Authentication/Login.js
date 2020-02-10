import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { Link } from "react-router-dom";
import Common from "./Common";
import { loginService } from "../../utils/Services";

import { FaSpinner } from "react-icons/fa";

const Login = props => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async e => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const data = { handle: username, password };
			const res = await loginService(data);
			if (res.error === true) {
				toast.error(res.message);
				setIsLoading(false);
			}
			if (res.message === "success") {
				toast.success("Welcome to Coderbano");

				const token = res.token;
				localStorage.setItem("token", token);
				localStorage.setItem("user_id", res.data._id);
				setIsLoading(false);
				props.history.push("/");
			}
		} catch (err) {
			console.log(err);
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
				<div className="col-md-5">
					<div className="card register-box p-4 mb-4">
						<h5 className="fontBd">Hey coder!</h5>
						<p className="fontMd mb-1 mt-4">
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
								disabled={isLoading}
								className="button mb-2"
							>
								<FaSpinner hidden={!isLoading} /> Start Coding
							</button>

							<hr className="box-hr" />
							<p className="mb-0" style={{ fontSize: 16 }}>
								<Link to="/register">Register</Link>{" "}
								<Link
									to="/reset-password"
									style={{ float: "right" }}
								>
									Reset Password
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
			<hr className="bottomline mt-5"></hr>
			<p className="text-center">
				Developed under the good works of DSC KIET
			</p>
		</div>
	);
};

export default Login;
