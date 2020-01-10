import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";

import Dashboard from "./components/Dashboard/Dashboard";
import Ladder from "./components/Dashboard/Ladder";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/ladder" component={Ladder}/>
      </Switch>
    </Router>
  );
}

export default App;
