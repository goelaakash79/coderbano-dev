import React, { useState, useEffect } from "react";
import { ladderService } from "../../utils/Services";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

import "./style.css";
const Ladder = props => {
	const [isLoading, setIsLoading] = useState(true);
	const [solvedProbs, setSolvedProbs] = useState([]);
	const [currentProb, setCurrentProb] = useState(null);
	const params = { div: props.location.state.div };

	useEffect(() => {
		(async () => {
			try {
				const res = await ladderService(params);
				setSolvedProbs(res.divSubs);
				setCurrentProb(res.unlockedProblem);
				setIsLoading(false);
			} catch (err) {
				console.log(err);
				setIsLoading(false);
			}
		})();
	}, []);
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
			<div hidden={isLoading}>
				<h4 className="mt-5 fontBd">
					Ladder:{" "}
					<span className="div-name">{props.location.state.div}</span>
				</h4>
				<hr />
				<div className="desc">
					<p>
						The problems are sorted, the most solved problem comes
						first. This is a good practice for whoever is beginner
						in programming problems.
					</p>
				</div>
				<div className="questions-section mb-4">
					<table className="table">
						<thead>
							<tr>
								<th>#</th>
								<th>Problem</th>
								<th>Difficulty Level</th>
								<th>Status</th>
							</tr>
						</thead>

						<tbody hidden={isLoading}>
							{solvedProbs.map((problem, i) => {
								return (
									<tr
										key={i}
										className={
											problem.status === "solved"
												? "problemsolved"
												: ""
										}
									>
										<td>{++i}</td>
										<td>
											<a
												rel="noopener noreferrer"
												target="_blank"
												className="problem-link"
												href={problem.problem.link}
											>
												{problem.problem.name}
											</a>
										</td>
										<td>{problem.problem.level}</td>
										<td>{problem.status}</td>
									</tr>
								);
							})}
							{currentProb ? (
								<tr key={currentProb.id}>
									<td>{currentProb.id}</td>
									<td>
										{currentProb.link ? (
											<a
												rel="noopener noreferrer"
												target="_blank"
												className="problem-link"
												href={currentProb.link}
											>
												{currentProb.name}
											</a>
										) : null}
									</td>
									<td>{currentProb.level}</td>
									<td>Unsolved</td>
								</tr>
							) : null}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Ladder;
