import React from "react";
import "./style.css";
// import { Link } from "react-router-dom";
import { FaLock, FaKeyboard, FaGhost } from "react-icons/fa";

const Dashboard = () => {

  const handleStalkDost = () => {
    let {history} = this.props;

    history.push("/stalk-friend")
  }
  return (
    <div className="container">
      <h4 className="mt-5 fontBd">Dashboard 
      <span className="stalk-friend-dashboard" onClick={handleStalkDost}><FaGhost/> Stalk your friend</span>
      </h4>
      <hr />
      <div className="row mt-5">
        <div className="col-md-9">
          <h5 className="fontMd">Codeforces Ladders</h5>
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card ladder-card p-4">
                <h5 className="fontBd mb-2">Div. 2.A</h5>
                <p className="desc">
                  This is a good practice for whoever is beginner in programming
                  problems.
                </p>
                <button className="col-6 unlock-button">
                  Unlock <FaLock />
                </button>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card ladder-card continue-div p-4">
                <h5 className="fontBd mb-2">Div. 2.A</h5>
                <p className="desc fontMd">
                  Problems Solved: 09 out of 100
                  <br />
                  Last question solved:{" "}
                  <span className="highlight">8 days ago</span>
                </p>
                <button className="col-6 unlock-button">
                  Continue <FaKeyboard />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <h5 className="fontMd">Stats</h5>

          <div className="stats-wrapper mt-4">
            <h6>Problems Solved</h6>
            <h3>
              <span className="fontBd green">79</span> / 800
            </h3>
            <br/>
            <h6>Joined</h6>
            <h5>
              <span className="fontMd">Jan 05, 2020</span>
            </h5>
            <br/>
            <h6>Most Productive On</h6>
            <h5>
              <span className="fontMd">Monday</span>
            </h5>
            <br/>
            <h6>Mostly codes in</h6>
            <h5>
              <span className="fontMd">Night</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
