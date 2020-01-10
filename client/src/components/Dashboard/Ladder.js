import React from "react";

function Ladder() {
	return (
		<div className="container">
			<h4 className="mt-5 fontBd">Ladder: <span className="div-name">Div. 2.A</span></h4>
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
						{/* {this.state.allQuestions.map((question, i) => { */}
						{/* return ( */}
						<tr key="hi">
							<td>1</td>
							<td>Code The God (Nice problem)</td>
							<td>1</td>
							<td>Solve usestion 1</td>
						</tr>
						<tr key="hi">
							<td>1</td>
							<td>Code The God (Nice problem)</td>
							<td>1</td>
							<td>Solve usestion 1</td>
						</tr>
						{/* ); */}
						{/* })} */}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Ladder;
