import React from "react";
import authCheck from "../authCheck";
import { FaUserSecret } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { logout } from "../../utils/services/authService";

export default props => {
	const user = authCheck();
	return (
		<>
			<Navbar className="mt-3 fontBd ml-0 pl-0 pb-0 mb-0 mr-0 pr-0">
				<Navbar.Brand>Coderbano</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse
					className="justify-content-end"
					id="basic-navbar-nav"
				>
					<Nav className="justify-content-end">
						<Navbar.Text>
							<Link to="/" className="navlink">
								Dashboard
							</Link>
						</Navbar.Text>
						<Navbar.Text>
							<Link to="/practice" className="navlink">
								Practice
							</Link>
						</Navbar.Text>
						<Navbar.Text>
							<Link to="/contests" className="navlink">
								Contests
							</Link>
						</Navbar.Text>
						<Navbar.Text>
							<Link to="/code" className="navlink">
								Code
							</Link>
						</Navbar.Text>

						<NavDropdown
							title="User"
							className="ml-0 mr-0 pl-0"
							id="basic-nav-dropdown"
						>
							<NavDropdown.Item href="#action/3.3">
								<span>
									<FaUserSecret />{" "}
									{user.isLoggedIn ? user.user.handle : null}
								</span>{" "}
							</NavDropdown.Item>
							<NavDropdown.Divider />

							<NavDropdown.Item href="#action/3.4">
								<span className="profile-section">
									<button onClick={logout}>Logout</button>
								</span>
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Navbar.Text>
						{/* S??igned in as: <a href="#login">Mark Otto</a> */}
					</Navbar.Text>
				</Navbar.Collapse>
				{/* <Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text>
						Signed in as: <a href="#login">Mark Otto</a>
					</Navbar.Text>
				</Navbar.Collapse> */}
			</Navbar>

			<hr className="mb-0 pb-0" />
		</>
	);
};

{
	/* <span
						className="stalk-friend-dashboard"
						onClick={handleStalkDost}
					>
						<FaGhost /> Stalk your friend
					</span> *
				<span className="profile-section">
					<span>
						<FaUserSecret />{" "}
						{user.isLoggedIn ? user.user.handle : null}
					</span>{" "}
					<button
						onClick={() => {
							localStorage.clear();
							props.history.push("/login");
						}}
					>
						Logout
					</button>
				</span> */
}
