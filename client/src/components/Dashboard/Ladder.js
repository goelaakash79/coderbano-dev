import React, { useState, useEffect } from "react";
import { ladderService } from "../../utils/services/mainService";
import Loading from "../Loading";

import "./style.css";
const Ladder = props => {
	const [isLoading, setIsLoading] = useState(true);
	const [problems, setProblems] = useState([]);
	const params = { div: props.match.params.div };

	useEffect(() => {
		(async () => {
			try {
				const res = await ladderService(params);
				setProblems(res.problems);
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
								{/* <th>Status</th> */}
							</tr>
						</thead>

						<tbody hidden={isLoading}>
							{problems.map((problem, i) => {
								return (
									<tr key={i}>
										<td>{++i}</td>
										<td>
											<a
												rel="noopener noreferrer"
												target="_blank"
												className="problem-link"
												to={problem.link}
											>
												{problem.name}
											</a>
										</td>
										<td>{problem.level}</td>
										{/* <td>{problem.status}</td> */}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Ladder;
