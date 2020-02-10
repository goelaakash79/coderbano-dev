import React, { useState } from "react";
import "./style.css";
import Common from "./Common";
import { Link } from "react-router-dom";
import { FaGhost, FaSpinner } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

import { registerService } from "../../utils/Services";

const Register = props => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async e => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const data = { email, password, handle: username };
			const res = await registerService(data);
			// console.log(res);

			if (res.error === true) {
				toast.error(`${res.message}`);
			}
			if (res.message === "Email/Handle already in use") {
				toast.error("😑 Email/Handle already in use");
			}
			if (res.message === "success") {
				toast.success(`Successfully Registered`);
				setIsLoading(false);
				props.history.push("/");
			}
		} catch (err) {
			// console.log(err);
			toast.error("😑 Some error occurred, please try again");
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
				<div className="col-md-5">
					<div className="card register-box p-4 mb-4">
						<h5 className="fontBd">Become a coder</h5>
						<p className="fontMd mb-1 mt-4">Enter details</p>
						<form onSubmit={handleSubmit}>
							<input
								placeholder="pick a username"
								type="text"
								name="username"
								value={username}
								onChange={e => setUsername(e.target.value)}
								className="form-control"
								required
							/>
							<label className="hint mb-2">
								same as your codeforces handle
							</label>

							<input
								placeholder="tell us your email address"
								type="email"
								value={email}
								name="email"
								onChange={e => setEmail(e.target.value)}
								className="form-control mb-2"
								required
							/>

							<input
								placeholder="choose a secure password"
								type="password"
								name="password"
								value={password}
								onChange={e => setPassword(e.target.value)}
								className="form-control mb-4"
								required
							/>

							<button
								disabled={isLoading}
								className="button mb-2"
							>
								<FaSpinner hidden={!isLoading} /> Create profile
							</button>

							<hr className="box-hr" />
							<p className="mb-0" style={{ fontSize: 16 }}>
								<Link to="/login">Sign In</Link>{" "}
								<Link
									to="/reset-password"
									style={{ float: "right" }}
								>
									Reset Password
								</Link>
							</p>
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

export default Register;
