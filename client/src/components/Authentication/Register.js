import React, { useState } from "react";
import "./style.css";
import { Toast } from "react-bootstrap";
import Common from "./Common";
import { FaGhost } from "react-icons/fa";
import { registerService } from "../../utils/Services";

const Register = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [disable, setDisable] = useState(false);
	const [show, setShow] = useState(false);
	const [message, setMessage] = useState("");

	// const validateInputs = () => {
	// 	if (!email || !password || !username) {
	// 		setDisable(true);
	// 	}
	// 	if (password.length >= 6) {
	// 		setDisable(false);
	// 	}
	// 	if (email && password && username) {
	// 		setDisable(false);
	// 	}
	// };

	const handleSubmit = async e => {
		e.preventDefault();
		// validateInputs();
		try {
			setDisable(true);
			const data = { email, password, handle: username };
			const res = await registerService(data);
			if (res) setDisable(false);
			if (res.message === "Email/Handle already in use") {
				setMessage("Email/Handle already in use");
				setShow(true);
			}
			if (res.message === "Invalid Codeforces handle") {
				console.log("Invalid Codeforces handle");
				setMessage("Invalid Codeforces handle");
				setShow(true);
			}
			if (res.message === "success") {
				console.log("okay");
				setMessage("Welcome");
				setShow(true);
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="container">
			<Toast
				onClose={() => setShow(false)}
				show={show}
				style={{
					right: 48,
					top: 48,
					float: "right",
					position: "absolute",
					zIndex: 999
				}}
				delay={3000}
				autohide
			>
				<Toast.Header>
					<strong className="mr-auto">Notification</strong>
				</Toast.Header>
				<Toast.Body>{message}</Toast.Body>
			</Toast>
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
								name="email"
								onChange={e => setEmail(e.target.value)}
								className="form-control mb-2"
								required
							/>

							<input
								placeholder="choose a secure password"
								type="password"
								name="password"
								onChange={e => setPassword(e.target.value)}
								className="form-control mb-4"
								required
							/>

							<button disabled={disable} className="button mb-2">
								Create profile
							</button>

							<hr className="box-hr" />
							<p className="mb-0" style={{ fontSize: 16 }}>
								<a href="/login">Sign In</a>{" "}
								<a
									href="/reset-password"
									style={{ float: "right" }}
								>
									Reset Password
								</a>
							</p>
							{/* <h5 className="text-center hint mb-0">Follow us on twitter</h5> */}
						</form>
					</div>
					<div className="stalk-friend col-12">
						<FaGhost /> Stalk your friend
					</div>
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
