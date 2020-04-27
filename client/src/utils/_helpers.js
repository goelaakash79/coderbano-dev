import React from "react";

export const Loading = isLoading => {
	return (
		<div
			className="loader text-center"
			style={{
				marginTop: "16em"
			}}
			hidden={!isLoading}
		>
			<p className="text-center">
				<div
					className="spinner-border spinner-border-sm text-primary"
					role="status"
				>
					<span className="sr-only">Loading...</span>
				</div>
				<br />
				<span className="small">Loading</span>
			</p>
		</div>
	);
};
