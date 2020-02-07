import React, { useState, useEffect } from "react";
import { ladderService } from "../../utils/Services";
import { Link } from "react-router-dom";
import "./style.css";
const Ladder = props => {
	const [solvedProbs, setSolvedProbs] = useState([]);
	const [currentProb, setCurrentProb] = useState({});

	useEffect(() => {
		const params = { div: props.location.state.div };
		(async () => {
			try {
				const res = await ladderService(params);
				console.log(res);
				setSolvedProbs(res.divSubs);
				setCurrentProb(res.unlockedProblem);
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);
	return (
		<div className="container">
			<h4 className="mt-5 fontBd">
				Ladder:{" "}
				<span className="div-name">{props.location.state.div}</span>
			</h4>
			<hr />
			<div className="desc">
				<p>
					The problems are sorted, the most solved problem comes
					first. This is a good practice for whoever is beginner in
					programming problems.
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
					<tbody>
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
										<Link
											className="problem-link"
											to={problem.problem.link}
										>
											{problem.problem.name}
										</Link>
									</td>
									<td>{problem.problem.level}</td>
									<td>{problem.status}</td>
								</tr>
							);
						})}
						{solvedProbs.length === 0 ? (
							<tr key={currentProb.id}>
								<td>{currentProb.id}</td>
								<td>
									<Link
										className="problem-link"
										to={currentProb.link}
									>
										{currentProb.name}
									</Link>
								</td>
								<td>{currentProb.level}</td>
								<td>Unsolved</td>
							</tr>
						) : null}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Ladder;
