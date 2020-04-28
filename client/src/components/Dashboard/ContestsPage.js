import React, { useState, useEffect } from "react";
import axios from "axios";

import Contests from "./Contests";
import Navbar from "./Navbar";
import Loading from "../Loading";
import "./ContestsPage.css";

export default props => {
	const [state, setState] = useState({
		heading: "",
		contests: null,
		isLoading: true
	});

	const getUpcomingContest = () => {
		axios.get("https://contesttrackerapi.herokuapp.com/").then(res =>
			setState({
				heading: "Upcoming",
				contests: res.data.result.upcoming,
				isLoading: false
			})
		);
	};
	const getOngoingContest = () => {
		axios.get("https://contesttrackerapi.herokuapp.com/").then(res =>
			setState({
				heading: "Ongoing",
				contests: res.data.result.ongoing,
				isLoading: false
			})
		);
	};

	useEffect(() => {
		const type = props.match.params.id;
		if (type === "ongoing") {
			getOngoingContest();
		} else {
			getUpcomingContest();
		}
	}, []);

	let contests = state.contests;
	return (
		<div className="fluid-container" style={{ paddingBottom: "0" }}>
			<div className="container">
				<Navbar />
			</div>
			<div className="about_kiet">
				<div className="container pt-4 pb-4">
					<div className="row">
						<div className="col-md-9 col-sm-12">
							<button
								onClick={getUpcomingContest}
								className="button mr-2 mb-2"
							>
								Upcoming Contests
							</button>
							<button
								onClick={getOngoingContest}
								className="button mb-2"
							>
								Ongoing Contests
							</button>

							<h5
								className="heading pb-0 mb-0 mt-2"
								style={{ color: "#121212" }}
							>
								{state.heading} Contests
							</h5>
							<p
								className="description mt-0 pt-0"
								style={{ color: "#707070" }}
							>
								Here you can check all the{" "}
								{state.heading.toLowerCase()} coding contests!
							</p>
						</div>
					</div>
					<div hidden={!state.isLoading} className="text-center">
						<Loading isLoading={state.isLoading} />
					</div>
					<div className="row" hidden={state.isLoading}>
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
};
