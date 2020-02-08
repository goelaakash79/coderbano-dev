import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import authCheck from "./components/authCheck";

import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";

import Dashboard from "./components/Dashboard/Dashboard";
import Ladder from "./components/Dashboard/Ladder";
// import StalkFriend from "./components/Friend/StalkFriend";

function App() {
	const user = authCheck();
	console.log(user);
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Dashboard} />
				<Route exact path="/dashboard" component={Dashboard} />
				<Route exact path="/ladder/:div" component={Ladder} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				{/* <Route
					exact
					path="/stalk-friend"
					component={isLoggedIn === true ? StalkFriend : Login}
				/> */}
			</Switch>
		</Router>
	);
}

export default App;
