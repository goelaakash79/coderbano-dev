import React, { useState, useEffect } from "react";
import { ladderService } from "../../utils/services/mainService";
import Loading from "../Loading";

import "./style.css";
const Ladder = props => {
	const [isLoading, setIsLoading] = useState(true);
	const [submissions, setSubmissions] = useState([]);
	const [unlockedProblem, setUnlockedProblem] = useState(null);
	const params = { div: props.match.params.div };

	useEffect(() => {
		(async () => {
			try {
				const res = await ladderService(params);
				console.log(res);
				setSubmissions(res.data.divSubs);
				setUnlockedProblem(res.data.unlockedProblem);
				setIsLoading(false);
			} catch (err) {
				console.log(err);
				setIsLoading(false);
			}
		})();
	}, []);
	return (
		<div className="container">
			<Loading isLoading={isLoading} />
			<div hidden={isLoading}>
				<h4 className="mt-4 fontBd">
					Ladder: <span className="div-name">{params.div}</span>
				</h4>
				<hr />
				<p className="desc">
					The problems are sorted, the most solved problem comes
					first. This is a good practice for whoever is beginner in
					programming problems.
				</p>
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
							{submissions.map((submission, i) => {
								return (
									<tr key={i}>
										<td>{++i}</td>
										<td>
											<a
												rel="noopener noreferrer"
												target="_blank"
												className="problem-link"
												href={submission.problem.link}
											>
												{submission.problem.name}
											</a>
										</td>
										<td>{submission.problem.level}</td>
										<td className="green">
											{submission.status}
										</td>
									</tr>
								);
							})}
							{unlockedProblem ? (
								<tr>
									<td>{submissions.length + 1}</td>
									<td>
										<a
											rel="noopener noreferrer"
											target="_blank"
											className="problem-link"
											href={unlockedProblem.link}
										>
											{unlockedProblem.name}
										</a>
									</td>
									<td>{unlockedProblem.level}</td>
									<td className="text-danger">unsolved</td>
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
