import React from "react";

export default props => {
	return (
		<div
			hidden={!props.isLoading}
			className={`spinner-border spinner-border-sm ${
				props.color ? `text-${props.color}` : "text-light"
			}`}
			role="status"
		>
			<span className="sr-only">Loading...</span>
		</div>
	);
};
