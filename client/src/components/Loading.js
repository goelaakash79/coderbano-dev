import React from "react";

export default props => {
	return (
		<>
			<div
				className="loader text-center"
				style={{
					marginTop: "16em"
				}}
				hidden={!props.isLoading}
			>
				<div
					className="spinner-border spinner-border-sm text-primary"
					role="status"
				>
					<span className="sr-only">Loading...</span>
				</div>
				<br />
				<span className="small">Loading</span>
			</div>
		</>
	);
};
