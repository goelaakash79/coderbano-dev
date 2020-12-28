import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { FaKeyboard, FaLock } from "react-icons/fa";

import { dashboardService } from "../../utils/services/mainService";
import authCheck from "../authCheck";
import Loading from "../Loading";
import Navbar from "./Navbar";
import { formatDistance } from "date-fns";

const Dashboard = props => {
	const [isLoading, setIsLoading] = useState(true);
	const [isSuffData, setIsSuffData] = useState(false);
	const [stats, setStats] = useState({
		productiveDay: "",
		productiveTimeOfDay: "",
		usedLanguage: "",
		joined: "",
		problemsSolved: ""
	});

	const [ladders, setLadders] = useState([]);
	const user = authCheck();

	useEffect(() => {
		if (!user.isLoggedIn) {
			return props.history.push("/login");
		}
		(async () => {
			const res = await dashboardService();

			if (res.message === "success") {
				setIsLoading(false);
			}
			if (props.location.state) {
				if (props.location.state.update) {
				}
			}
			let laddersArr = Object.keys(res.data.ladderDetails).map(
				(ladder, id) => {
					return {
						details: Object.values(res.data.ladderDetails)[id],
						name: ladder
					};
				}
			);

			setLadders(laddersArr);

			let problemsSolved = 0;
			laddersArr.map((ladder, i) => {
				return (problemsSolved += ladder.details.problemsSolved);
			});

			// await ladderService({ div: "2, A" });
			setIsLoading(false);
			if (res.data.most.productiveDay === "Insufficient data") {
				setIsSuffData(false);
			} else {
				setStats({
					productiveDay: res.data.most.productiveDay,
					productiveTimeOfDay: res.data.most.productiveTimeOfDay,
					usedLanguage: res.data.most.usedLanguage,
					joined: res.data.createdAt,
					problemsSolved
				});
				setIsSuffData(true);
			}
		})();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="container">
			<Loading isLoading={isLoading} />
			<div className="section" hidden={isLoading}>
				<Navbar />
				<div className="row mt-4">
					<div className="col-md-12 col-lg-9">
						<h5 className="fontMd">Codeforces Ladders</h5>
						<div className="row mt-4">
							{ladders.map((ladder, idx) => {
								return (
									<div className="col-md-4 mb-2" key={idx}>
										<div
											className={`card ladder-card p-4 ${
												ladder.details.unlocked === true
													? "continue-div"
													: ""
											}`}
										>
											<h5 className="fontBd mb-2">
												Div. {ladder.name}
											</h5>
											<p className="desc">
												{ladder.details.unlocked ===
												true ? (
													<>
														{formatDistance(
															new Date(
																ladder.details.lastActivity
															),
															new Date(),
															{ addSuffix: true }
														)}
													</>
												) : (
													<>
														solve a problem to
														unlock
													</>
												)}
											</p>
											<Link
												className="col-12 unlock-button"
												to={{
													pathname: `/ladder/${ladder.name}`,
													state: { div: ladder.name }
												}}
											>
												{ladder.details.unlocked ===
												true ? (
													<>
														Continue <FaKeyboard />
													</>
												) : (
													<>
														Unlock <FaLock />
													</>
												)}
											</Link>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className="col-md-3 col-lg-3">
						<h5 className="fontMd">Stats</h5>

						{isSuffData ? (
							<div className="stats-wrapper mt-4">
								<h6>Problems Solved</h6>
								<h3>
									<span className="fontBd green">
										{stats.problemsSolved}
									</span>{" "}
									/ 800
								</h3>
								<br />
								<h6>Most Productive On</h6>
								<h5>
									<span className="fontMd">
										{stats.productiveDay}
									</span>
								</h5>
								<br />
								<h6>Mostly codes in</h6>
								<h5>
									<span className="fontMd">
										{stats.productiveTimeOfDay}
									</span>
								</h5>
								<br />
								<h6>Mostly codes in</h6>
								<h5>
									<span className="fontMd">
										{stats.usedLanguage}
									</span>
								</h5>
								<br />
								<h6>Joined on</h6>
								<h5>
									<span className="fontMd">
										{formatDistance(
											new Date(stats.joined),
											new Date(),
											{ addSuffix: true }
										)}
									</span>
								</h5>
							</div>
						) : (
							<div className="stats-wrapper mt-4">
								Please unlock a ladder to view stats{" "}
								<span role="img" aria-label="">
									😀
								</span>
								<br />
								<br />
								If you have solved some questions previously,
								just click on unlock, to unlock that particular
								ladder, and we will add them to your statistics.
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
