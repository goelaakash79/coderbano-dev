import React, { Component } from "react";

export default class Contests extends Component {
	render() {
		const { contestInfo } = this.props;
		return (
			<div className="col-lg-4 col-sm-6 col-12">
				<div className="card blog__card" style={{ padding: "16px" }}>
					<h6 className="heading">{contestInfo.Name}</h6>
					<span className="contest_provider">
						{contestInfo.Platform}
					</span>
					{contestInfo.Duration ? (
						<span className="event_duration">
							{contestInfo.Duration}
						</span>
					) : null}

					<div className="description">
						{contestInfo.StartTime ? (
							<div>
								<b>Start Date</b>
								{":"}
								<div>{String(contestInfo.StartTime)}</div>
							</div>
						) : null}
						{/* <br style={{ marginBottom: "8px" }} /> */}
						{contestInfo.EndTime ? (
							<div>
								<b>End Date</b>
								{":"}
								<div> {String(contestInfo.EndTime)}</div>
							</div>
						) : null}
					</div>
					<a
						href={contestInfo.url}
						className="btn-more text-center"
						target="_blank"
						rel="noopener noreferrer"
					>
						See More
					</a>
				</div>
			</div>
		);
	}
}
