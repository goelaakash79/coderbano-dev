import React from "react";
// import { Row, Col, Container } from "react-bootstrap";
import "./style.css";
import sideImage from "../../utils/images/side-image.png";

function Register() {
  return (
    <div className="container">
      <div className="row pt-5 mt-5 mb-5 pb-5">
        <div className="col-md-7">
          <img src={sideImage} alt="" width="100%" />
          <h3 className="fontRg mt-4 mb-0 title">coderbano {"💻"}</h3>
          <p className="fontBd tagline">
            a tribute to A2OJ; curated during nights
          </p>
        </div>
        <div className="col-md-5">
          <div class="card register-box p-4">
            <h5 className="fontBd">Become a coder</h5>
            <p className="fontMd mb-1 mt-4">Enter details</p>
            <form method="post">
              <input
                placeholder="pick a username"
                type="text"
                name="username"
                // onChange={this.handleInputs}
                className="form-control"
              />
              <label className="hint mb-2">
                same as your codeforces handle
              </label>

              <input
                placeholder="tell us your email address"
                type="email"
                name="email"
                // onChange={this.handleInputs}
                className="form-control mb-2"
              />

              <input
                placeholder="choose a secure password"
                type="password"
                name="password"
                // onChange={this.handleInputs}
                className="form-control mb-4"
              />

              <button className="button mb-2">Create profile</button>

              <hr className="box-hr"/>
              <p className="mb-0" style={{fontSize: 16}}><a href="/login">Sign In</a> <a href="/reset-password" style={{float:'right'}}>Reset Password</a></p>
              {/* <h5 className="text-center hint mb-0">Follow us on twitter</h5> */}
            </form>
          </div>
        </div>
      </div>

      <hr className="bottomline mt-5"></hr>
      <p className="text-center">Developed under the good works of DSC KIET</p>
    </div>
  );
}

export default Register;
