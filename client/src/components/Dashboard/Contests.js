import React from "react";

export default ({ contestInfo }) => {
	return (
		<div className="col-lg-4 col-sm-6 col-12">
			<div
				className="card"
				style={{ padding: "16px", cursor: "pointer" }}
				onClick={() => window.open(contestInfo.url)}
			>
				<h6 className="heading">{contestInfo.Name}</h6>
				<span>
					<span className="contest_provider">
						{String(contestInfo.Platform).toLowerCase()}
					</span>{" "}
					{contestInfo.Duration ? (
						<span className="event_duration">
							{contestInfo.Duration}
						</span>
					) : null}
				</span>

				<div className="description">
					{contestInfo.StartTime && contestInfo.EndTime ? (
						<div>
							From{" "}
							{new Date(contestInfo.StartTime).toLocaleString()}{" "}
							<br />
							To {new Date(contestInfo.EndTime).toLocaleString()}
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};
