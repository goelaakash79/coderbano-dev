import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { FaKeyboard, FaLock, FaGhost, FaSpinner } from "react-icons/fa";
import { dashboardService } from "../../utils/Services";

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

	useEffect(() => {
		(async () => {
			const res = await dashboardService();
			let laddersArr = Object.keys(res.ladderDetails).map(
				(ladder, id) => {
					return {
						details: Object.values(res.ladderDetails)[id],
						name: ladder
					};
				}
			);
			setLadders(laddersArr);

			let problemsSolved = 0;
			laddersArr.map((ladder, i) => {
				return (problemsSolved += ladder.details.problemsSolved);
			});
			setIsLoading(false);
			if (res.most.productiveDay === "Insufficient data") {
				setIsSuffData(true);
			} else {
				setStats({
					productiveDay: res.most.productiveDay,
					productiveTimeOfDay: res.most.productiveTimeOfDay,
					usedLanguage: res.most.usedLanguage,
					joined: res.createdAt,
					problemsSolved
				});
			}
		})();
	}, []);

	const handleStalkDost = () => {
		let { history } = props;
		history.push("/stalk-friend");
	};
	return (
		<div className="container">
			<div
				className="loader text-center"
				style={{
					marginTop: "16em"
				}}
				hidden={!isLoading}
			>
				<p className="text-center">
					<FaSpinner />
					<br />
					<span className="small">Loading</span>
				</p>
			</div>
			<div className="section" hidden={isLoading}>
				<h4 className="mt-5 fontBd">
					Dashboard
					<span
						className="stalk-friend-dashboard"
						onClick={handleStalkDost}
					>
						<FaGhost /> Stalk your friend
					</span>
				</h4>
				<hr />
				<div className="row mt-5">
					<div className="col-md-9">
						<h5 className="fontMd">Codeforces Ladders</h5>
						<div className="row mt-4">
							{ladders.map((ladder, idx) => {
								return (
									<div className="col-md-6 mb-4" key={idx}>
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
														Last Problem Solved on:{" "}
														{
															ladder.details.lastActivity.split(
																"T"
															)[0]
														}
													</>
												) : (
													<>
														Unlock this ladder by
														solving a problem
													</>
												)}
											</p>
											<Link
												className="col-6 unlock-button"
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
					<div className="col-md-3">
						<h5 className="fontMd">Stats</h5>

						<div className="stats-wrapper mt-4" hidden={isSuffData}>
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
									{stats.joined.split("T")[0]}
								</span>
							</h5>
						</div>

						<div
							className="stats-wrapper mt-4"
							hidden={!isSuffData}
						>
							Please unlock a ladder to view stats{" "}
							<span role="img" aria-label="">
								😀
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
