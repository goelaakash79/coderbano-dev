import React from "react";
import "./style.css";
// import { Link } from "react-router-dom";
import { FaLock, FaKeyboard } from "react-icons/fa";

function Dashboard() {
  return (
    <div class="container">
      <h4 class="mt-5 fontBd">Dashboard</h4>
      <hr />
      <div class="row mt-5">
        <div class="col-md-9">
          <h5 class="fontMd">Codeforces Ladders</h5>
          <div class="row mt-4">
            <div class="col-md-6">
              <div class="card ladder-card p-4">
                <h5 class="fontBd mb-2">Div. 2.A</h5>
                <p class="desc">
                  This is a good practice for whoever is beginner in programming
                  problems.
                </p>
                <button class="col-6 unlock-button">
                  Unlock <FaLock />
                </button>
              </div>
            </div>

            <div class="col-md-6">
              <div class="card ladder-card continue-div p-4">
                <h5 class="fontBd mb-2">Div. 2.A</h5>
                <p class="desc fontMd">
                  Problems Solved: 09 out of 100
                  <br />
                  Last question solved:{" "}
                  <span class="highlight">8 days ago</span>
                </p>
                <button class="col-6 unlock-button">
                  Continue <FaKeyboard />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <h5 class="fontMd">Stats</h5>

          <div class="stats-wrapper mt-4">
            <h6>Problems Solved</h6>
            <h3>
              <span class="fontBd green">79</span> / 800
            </h3>
            <br/>
            <h6>Joined</h6>
            <h5>
              <span class="fontMd">Jan 05, 2020</span>
            </h5>
            <br/>
            <h6>Most Productive On</h6>
            <h5>
              <span class="fontMd">Monday</span>
            </h5>
            <br/>
            <h6>Mostly codes in</h6>
            <h5>
              <span class="fontMd">Night</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
