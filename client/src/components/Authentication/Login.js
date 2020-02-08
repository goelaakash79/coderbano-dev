import React, { useState } from "react";
// import { Row, Col, Container } from "react-bootstrap";
import "./style.css";
import { Toast } from "react-bootstrap";

import Common from "./Common";
import { loginService, ladderService } from "../../utils/Services";

import { FaGhost } from "react-icons/fa";

const Login = props => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [show, setShow] = useState(false);
	const [message, setMessage] = useState("");
	// const [disable, setDisable] = useState(false);

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const data = { handle: username, password };

			const res = await loginService(data);
			if (res.message === "invalid user") {
				console.log("Invalid");
				setMessage("Please register first");
				setShow(true);
			}
			if (res.message === "success") {
				const token = res.token;
				localStorage.setItem("token", token);
				localStorage.setItem("user_id", res.data._id);

				await props.history.push({
					pathname: "/",
					state: { update: 1 }
				});
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="container">
			<div
				onClose={() => setShow(false)}
				show={show}
				style={{
					right: 48,
					top: 48,
					float: "right",
					position: "absolute",
					zIndex: 999
				}}
			>
				{message}
			</div>
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

							<button className="button mb-2">
								Start Coding
							</button>

							<hr className="box-hr" />
							<p className="mb-0" style={{ fontSize: 16 }}>
								<a href="/register">Register</a>{" "}
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
