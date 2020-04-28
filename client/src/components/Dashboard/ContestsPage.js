import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Contests from "./Contests";
import Navbar from "./Navbar";
import "./ContestsPage.css";

export default class ContestsPage extends Component {
	state = {
		heading: "",
		contests: null,
		isLoading: true
	};

	componentDidMount() {
		const type = this.props.match.params.id;
		if (type === "ongoing") {
			this.getOngoingContest();
		} else {
			// console.log(type);
			this.getUpcomingContest();
		}
	}

	getUpcomingContest = () => {
		axios.get("https://contesttrackerapi.herokuapp.com/").then(res =>
			this.setState({
				heading: "Upcoming",
				contests: res.data.result.upcoming,
				isLoading: false
			})
		);
	};
	getOngoingContest = () => {
		axios.get("https://contesttrackerapi.herokuapp.com/").then(res =>
			this.setState({
				heading: "Ongoing",
				contests: res.data.result.ongoing,
				isLoading: false
			})
		);
	};

	render() {
		let contests = this.state.contests;
		return (
			<div className="fluid-container" style={{ paddingBottom: "0" }}>
				<div className="container">
					<Navbar />
				</div>
				<div className="about_kiet">
					<div className="container pt-4 pb-4">
						<div className="row">
							<div className="col-md-9 col-sm-12">
								<Link
									// to="/contests/upcoming"
									onClick={this.getUpcomingContest}
									style={{ marginBottom: "10px" }}
									className="btn btn-outline-primary prime_btn"
								>
									Upcoming Contests
								</Link>
								<Link
									// to="/contests/ongoing"
									onClick={this.getOngoingContest}
									style={{ marginBottom: "10px" }}
									className="btn btn-info sec_btn"
								>
									Ongoing Contests
								</Link>
								<h5
									className="heading"
									style={{ color: "#fff" }}
								>
									{this.state.heading} Contests
								</h5>
								<p
									className="description"
									style={{ color: "#fff" }}
								>
									Here you can check all the{" "}
									{this.state.heading.toLowerCase()} coding
									contests!
								</p>
							</div>
						</div>
						<div
							hidden={!this.state.isLoading}
							className="text-center"
						>
							<div
								hidden={!this.state.isLoading}
								className="spinner-border spinner-border-sm text-light mx-auto my-auto"
								role="status"
							>
								<span className="sr-only">Loading...</span>
							</div>
						</div>
						<div className="row">
							{contests
								? contests.map((contest, index) => (
										<Contests
											key={index}
											contestInfo={contest}
										/>
								  ))
								: null}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
