import React from "react";
import "./style.css";
import sideImage from "../../utils/images/119-working.png";

const Common = () => {
	return (
		<div className="col-md-7">
			<img src={sideImage} alt="" width="100%" />
			<h3 className="fontBd mt-4 mb-0 title">coderbano {"🚀"}</h3>
			{/* <p className="fontRg tagline">
				c ompile and run your codes, get the best questions to practice
			</p> */}
		</div>
	);
};

export default Common;
